(function () {
  "use strict";

  // -------------------------------------------------------------------
  // Constants
  // -------------------------------------------------------------------
  const MAX_MAPS_WAYPOINTS = 10; // Google Maps deep-link practical limit.
  const DAY_NAMES = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const MONTH_NAMES = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  // Rough centroids for per-stop sorting context (kept for maps links only).
  // -------------------------------------------------------------------
  // DOM refs
  // -------------------------------------------------------------------
  const screens = {
    calendar: document.getElementById("calendarScreen"),
    run: document.getElementById("runScreen"),
    "add-dogs": document.getElementById("addDogsScreen"),
    "manage-dogs": document.getElementById("manageDogsScreen"),
  };

  const els = {
    manageDogsBtn: document.getElementById("manageDogsBtn"),
    prevWeekBtn: document.getElementById("prevWeekBtn"),
    nextWeekBtn: document.getElementById("nextWeekBtn"),
    weekLabel: document.getElementById("weekLabel"),
    agendaList: document.getElementById("agendaList"),
    newRunFab: document.getElementById("newRunFab"),

    runBackBtn: document.getElementById("runBackBtn"),
    runKebabBtn: document.getElementById("runKebabBtn"),
    runTitleInput: document.getElementById("runTitleInput"),
    runDateInput: document.getElementById("runDateInput"),
    runStopsList: document.getElementById("runStopsList"),
    runEmptyState: document.getElementById("runEmptyState"),
    addDogsBtn: document.getElementById("addDogsBtn"),

    addDogsBackBtn: document.getElementById("addDogsBackBtn"),
    addDogsRunTitle: document.getElementById("addDogsRunTitle"),
    addDogsSearch: document.getElementById("addDogsSearch"),
    pickerDogList: document.getElementById("pickerDogList"),

    manageDogsBackBtn: document.getElementById("manageDogsBackBtn"),
    manageDogsSearch: document.getElementById("manageDogsSearch"),
    manageDogList: document.getElementById("manageDogList"),
    addDogFab: document.getElementById("addDogFab"),

    contextMenu: document.getElementById("contextMenu"),
    newRunOverlay: document.getElementById("newRunOverlay"),
    newRunSheet: document.getElementById("newRunSheet"),
    detailOverlay: document.getElementById("detailOverlay"),
    detailSheet: document.getElementById("detailSheet"),
    addOverlay: document.getElementById("addOverlay"),
    addSheet: document.getElementById("addSheet"),
    toast: document.getElementById("toast"),
  };

  // -------------------------------------------------------------------
  // State
  // -------------------------------------------------------------------
  const state = {
    dogs: [],
    runs: [],
    screen: "calendar",
    weekStart: startOfWeek(new Date()),
    currentRunId: null,
    manageDogsSearch: "",
    manageDogsShowArchived: false,
    addDogsSearch: "",
  };

  // -------------------------------------------------------------------
  // Date helpers
  // -------------------------------------------------------------------
  function startOfWeek(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const day = d.getDay(); // 0 = Sunday
    const diff = day === 0 ? -6 : 1 - day;
    d.setDate(d.getDate() + diff);
    return d;
  }

  function addDays(date, n) {
    const d = new Date(date);
    d.setDate(d.getDate() + n);
    return d;
  }

  function toISODate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function isSameDate(a, b) {
    return toISODate(a) === toISODate(b);
  }

  function formatWeekRangeLabel(weekStart) {
    const weekEnd = addDays(weekStart, 6);
    const sameMonth = weekStart.getMonth() === weekEnd.getMonth();
    const startStr = `${weekStart.getDate()} ${MONTH_NAMES[weekStart.getMonth()]}`;
    const endStr = sameMonth
      ? `${weekEnd.getDate()}`
      : `${weekEnd.getDate()} ${MONTH_NAMES[weekEnd.getMonth()]}`;
    return `${startStr} – ${endStr}`;
  }

  // -------------------------------------------------------------------
  // API
  // -------------------------------------------------------------------
  const api = {
    async getDogs() {
      const res = await fetch("api/dogs?includeArchived=true");
      if (!res.ok) throw new Error("Failed to load dogs");
      return res.json();
    },
    async createDog(payload) {
      const res = await fetch("api/dogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw await apiError(res);
      return res.json();
    },
    async patchDog(id, payload) {
      const res = await fetch(`api/dogs/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw await apiError(res);
      return res.json();
    },
    async addNote(id, text) {
      const res = await fetch(`api/dogs/${encodeURIComponent(id)}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw await apiError(res);
      return res.json();
    },
    async uploadPhoto(id, file) {
      const formData = new FormData();
      formData.append("photo", file);
      const res = await fetch(`api/dogs/${encodeURIComponent(id)}/photo`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw await apiError(res);
      return res.json();
    },
    async getRuns() {
      const res = await fetch("api/runs");
      if (!res.ok) throw new Error("Failed to load runs");
      return res.json();
    },
    async createRun(payload) {
      const res = await fetch("api/runs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw await apiError(res);
      return res.json();
    },
    async patchRun(id, payload) {
      const res = await fetch(`api/runs/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw await apiError(res);
      return res.json();
    },
    async putRunStops(id, dogIds) {
      const res = await fetch(`api/runs/${encodeURIComponent(id)}/stops`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dogIds }),
      });
      if (!res.ok) throw await apiError(res);
      return res.json();
    },
    async deleteRun(id) {
      const res = await fetch(`api/runs/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!res.ok && res.status !== 204) throw await apiError(res);
    },
  };

  async function apiError(res) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body && body.error) message = body.error;
    } catch (_e) {
      /* ignore */
    }
    return new Error(message);
  }

  // -------------------------------------------------------------------
  // Utilities
  // -------------------------------------------------------------------
  function escapeHtml(str) {
    return String(str || "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[c]));
  }

  function formatDateTime(iso) {
    if (!iso) return "";
    try {
      return new Date(iso).toLocaleString(undefined, {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (_e) {
      return iso;
    }
  }

  function debounce(fn, delay) {
    let timer = null;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }

  function dogById(id) {
    return state.dogs.find((d) => d.id === id);
  }

  function runById(id) {
    return state.runs.find((r) => r.id === id);
  }

  function currentRun() {
    return runById(state.currentRunId);
  }

  function toast(message) {
    els.toast.textContent = message;
    els.toast.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => {
      els.toast.hidden = true;
    }, 2400);
  }

  function mapsDirLink(address) {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      address
    )}`;
  }

  function mapsMultiStopLink(dogsInOrder) {
    const limited = dogsInOrder.slice(0, MAX_MAPS_WAYPOINTS);
    const destination = limited[limited.length - 1];
    const waypoints = limited.slice(0, -1);
    const params = new URLSearchParams({
      api: "1",
      destination: destination.address,
      travelmode: "driving",
    });
    if (waypoints.length) {
      params.set("waypoints", waypoints.map((d) => d.address).join("|"));
    }
    return `https://www.google.com/maps/dir/?${params.toString()}`;
  }

  function dogAvatarHtml(dog) {
    if (dog.photoPath) {
      return `<img class="dog-avatar" src="${escapeHtml(dog.photoPath)}" alt="" />`;
    }
    const initial = (dog.name || "?").trim().charAt(0).toUpperCase();
    return `<div class="dog-avatar">${escapeHtml(initial)}</div>`;
  }

  // -------------------------------------------------------------------
  // Screen navigation
  // -------------------------------------------------------------------
  function switchScreen(name) {
    state.screen = name;
    Object.entries(screens).forEach(([key, el]) => {
      el.hidden = key !== name;
    });
    window.scrollTo(0, 0);
  }

  // -------------------------------------------------------------------
  // Calendar screen
  // -------------------------------------------------------------------
  function renderCalendar() {
    els.weekLabel.textContent = formatWeekRangeLabel(state.weekStart);
    const today = new Date();

    let html = "";
    for (let i = 0; i < 7; i++) {
      const day = addDays(state.weekStart, i);
      const dateStr = toISODate(day);
      const dayRuns = state.runs.filter((r) => r.date === dateStr);
      const todayClass = isSameDate(day, today) ? " is-today" : "";

      const runsHtml = dayRuns.length
        ? dayRuns
            .map(
              (run) => `
          <button type="button" class="run-pill color-${run.color}" data-run-id="${run.id}">
            <div class="run-pill-title">${escapeHtml(run.title)}</div>
            <div class="run-pill-meta">${run.dogIds.length} dog${run.dogIds.length === 1 ? "" : "s"}</div>
          </button>`
            )
            .join("")
        : `<div class="day-empty-hint">No runs</div>`;

      html += `
        <div class="day-row${todayClass}">
          <div class="day-col">
            <div class="day-name">${DAY_NAMES[i]}</div>
            <div class="day-number">${day.getDate()}</div>
          </div>
          <div class="day-runs">${runsHtml}</div>
        </div>
      `;
    }
    els.agendaList.innerHTML = html;
  }

  function changeWeek(delta) {
    state.weekStart = addDays(state.weekStart, delta * 7);
    renderCalendar();
  }

  // -------------------------------------------------------------------
  // Run detail screen
  // -------------------------------------------------------------------
  function openRun(runId) {
    state.currentRunId = runId;
    renderRunScreen();
    switchScreen("run");
  }

  function renderRunScreen() {
    const run = currentRun();
    if (!run) {
      switchScreen("calendar");
      return;
    }
    if (document.activeElement !== els.runTitleInput) {
      els.runTitleInput.value = run.title;
    }
    els.runDateInput.value = run.date;

    const dogs = run.dogIds.map(dogById).filter(Boolean);
    els.runEmptyState.hidden = dogs.length > 0;
    els.runStopsList.hidden = dogs.length === 0;

    els.runStopsList.innerHTML = dogs
      .map((dog, index) => {
        const rowClasses = ["dog-row"];
        if (dog.keysafe) rowClasses.push("flagged");
        return `
          <li class="${rowClasses.join(" ")}" data-dog-id="${dog.id}">
            <span class="stop-position mono">${index + 1}</span>
            ${dogAvatarHtml(dog)}
            <button type="button" class="dog-main" data-action="open-detail" data-dog-id="${dog.id}">
              <div class="dog-name">${escapeHtml(dog.name)}</div>
              <div class="dog-address">${escapeHtml(dog.address)}${
                dog.postcode ? " · " + escapeHtml(dog.postcode) : ""
              }</div>
            </button>
            <a class="maps-btn" href="${mapsDirLink(dog.address)}" target="_blank" rel="noopener" aria-label="Directions to ${escapeHtml(dog.name)}">📍</a>
            <div class="reorder-controls">
              <button type="button" class="reorder-btn" data-action="move-up" data-dog-id="${dog.id}" ${index === 0 ? "disabled" : ""}>▲</button>
              <button type="button" class="reorder-btn" data-action="move-down" data-dog-id="${dog.id}" ${index === dogs.length - 1 ? "disabled" : ""}>▼</button>
            </div>
            <button type="button" class="kebab-btn" data-action="kebab-run-stop" data-dog-id="${dog.id}" aria-label="More options">⋮</button>
          </li>
        `;
      })
      .join("");
  }

  async function saveRunStops(run) {
    try {
      await api.putRunStops(run.id, run.dogIds);
    } catch (err) {
      toast(err.message || "Failed to save run");
    }
    renderCalendar();
  }

  function moveInRun(dogId, direction) {
    const run = currentRun();
    if (!run) return;
    const idx = run.dogIds.indexOf(dogId);
    const swapWith = idx + direction;
    if (idx === -1 || swapWith < 0 || swapWith >= run.dogIds.length) return;
    [run.dogIds[idx], run.dogIds[swapWith]] = [run.dogIds[swapWith], run.dogIds[idx]];
    renderRunScreen();
    saveRunStops(run);
  }

  function removeFromRun(dogId) {
    const run = currentRun();
    if (!run) return;
    run.dogIds = run.dogIds.filter((id) => id !== dogId);
    renderRunScreen();
    saveRunStops(run);
    toast("Removed from run");
  }

  async function deleteCurrentRun() {
    const run = currentRun();
    if (!run) return;
    const ok = confirm(`Delete "${run.title}"? This can't be undone.`);
    if (!ok) return;
    try {
      await api.deleteRun(run.id);
      state.runs = state.runs.filter((r) => r.id !== run.id);
      switchScreen("calendar");
      renderCalendar();
      toast("Run deleted");
    } catch (err) {
      toast(err.message || "Failed to delete run");
    }
  }

  // -------------------------------------------------------------------
  // Add dogs to run screen
  // -------------------------------------------------------------------
  function openAddDogsScreen() {
    const run = currentRun();
    if (!run) return;
    state.addDogsSearch = "";
    els.addDogsSearch.value = "";
    els.addDogsRunTitle.textContent = run.title;
    renderPickerList();
    switchScreen("add-dogs");
  }

  function renderPickerList() {
    const run = currentRun();
    if (!run) return;
    const q = state.addDogsSearch.trim().toLowerCase();
    const dogs = state.dogs
      .filter((d) => !d.archived)
      .filter((d) => {
        if (!q) return true;
        return (
          d.name.toLowerCase().includes(q) ||
          d.address.toLowerCase().includes(q) ||
          (d.postcode || "").toLowerCase().includes(q)
        );
      })
      .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

    if (dogs.length === 0) {
      els.pickerDogList.innerHTML = `<li class="empty-state">No dogs match your search.</li>`;
      return;
    }

    els.pickerDogList.innerHTML = dogs
      .map((dog) => {
        const picked = run.dogIds.includes(dog.id);
        return `
          <li class="dog-row${picked ? " picked" : ""}" data-dog-id="${dog.id}">
            <button type="button" class="dog-main" data-action="toggle-pick" data-dog-id="${dog.id}" style="display:flex; align-items:center; gap:12px;">
              ${dogAvatarHtml(dog)}
              <span style="flex:1; min-width:0;">
                <span class="dog-name">${escapeHtml(dog.name)} <span class="size-badge">${escapeHtml(dog.size)}</span></span>
                <div class="dog-address">${escapeHtml(dog.address)}${
                  dog.postcode ? " · " + escapeHtml(dog.postcode) : ""
                }</div>
              </span>
            </button>
            <span class="picker-check">✓</span>
          </li>
        `;
      })
      .join("");
  }

  function togglePick(dogId) {
    const run = currentRun();
    if (!run) return;
    const idx = run.dogIds.indexOf(dogId);
    if (idx === -1) run.dogIds.push(dogId);
    else run.dogIds.splice(idx, 1);
    renderPickerList();
    saveRunStops(run);
  }

  // -------------------------------------------------------------------
  // Manage dogs (global) screen
  // -------------------------------------------------------------------
  function openManageDogsScreen() {
    state.manageDogsSearch = "";
    els.manageDogsSearch.value = "";
    renderManageDogsList();
    switchScreen("manage-dogs");
  }

  function filteredManageDogs() {
    const q = state.manageDogsSearch.trim().toLowerCase();
    return state.dogs
      .filter((d) => state.manageDogsShowArchived || !d.archived)
      .filter((d) => {
        if (!q) return true;
        return (
          d.name.toLowerCase().includes(q) ||
          d.address.toLowerCase().includes(q) ||
          (d.postcode || "").toLowerCase().includes(q)
        );
      })
      .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  }

  function renderManageDogsList() {
    const dogs = filteredManageDogs();
    if (dogs.length === 0) {
      els.manageDogList.innerHTML = `<li class="empty-state">No dogs match your search.</li>`;
      return;
    }
    els.manageDogList.innerHTML = dogs
      .map((dog) => {
        const rowClasses = ["dog-row"];
        if (dog.archived) rowClasses.push("archived");
        const keysafe = dog.keysafe
          ? `<span class="keysafe-chip mono" title="Keysafe code">${escapeHtml(dog.keysafe)}</span>`
          : "";
        return `
          <li class="${rowClasses.join(" ")}" data-dog-id="${dog.id}">
            ${dogAvatarHtml(dog)}
            <button type="button" class="dog-main" data-action="open-detail" data-dog-id="${dog.id}">
              <div class="dog-name">
                ${escapeHtml(dog.name)}
                <span class="size-badge">${escapeHtml(dog.size)}</span>
              </div>
              <div class="dog-address">${escapeHtml(dog.address)}${
                dog.postcode ? " · " + escapeHtml(dog.postcode) : ""
              }</div>
            </button>
            ${keysafe}
            <button type="button" class="kebab-btn" data-action="kebab-manage" data-dog-id="${dog.id}" aria-label="More options">⋮</button>
          </li>
        `;
      })
      .join("");
  }

  async function archiveDog(dogId, archived) {
    try {
      const updated = await api.patchDog(dogId, { archived });
      const idx = state.dogs.findIndex((d) => d.id === dogId);
      if (idx !== -1) state.dogs[idx] = updated;
      renderManageDogsList();
      toast(archived ? "Dog archived" : "Dog restored");
    } catch (err) {
      toast(err.message || "Something went wrong");
    }
  }

  // -------------------------------------------------------------------
  // Context menu
  // -------------------------------------------------------------------
  function openContextMenu(anchorEl, items) {
    const menu = els.contextMenu;
    menu.innerHTML = items
      .map(
        (item, i) =>
          `<button type="button" data-menu-index="${i}" class="${item.danger ? "danger" : ""}">${escapeHtml(item.label)}</button>`
      )
      .join("");
    menu.hidden = false;

    const rect = anchorEl.getBoundingClientRect();
    const menuWidth = 200;
    let left = rect.right - menuWidth;
    left = Math.max(8, Math.min(left, window.innerWidth - menuWidth - 8));
    let top = rect.bottom + 6;
    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;

    requestAnimationFrame(() => {
      const menuRect = menu.getBoundingClientRect();
      if (menuRect.bottom > window.innerHeight - 8) {
        menu.style.top = `${rect.top - menuRect.height - 6}px`;
      }
    });

    menu.onclick = (e) => {
      const btn = e.target.closest("button[data-menu-index]");
      if (!btn) return;
      const item = items[Number(btn.dataset.menuIndex)];
      closeContextMenu();
      if (item && item.onSelect) item.onSelect();
    };
  }

  function closeContextMenu() {
    els.contextMenu.hidden = true;
    els.contextMenu.innerHTML = "";
    els.contextMenu.onclick = null;
  }

  document.addEventListener("click", (e) => {
    if (els.contextMenu.hidden) return;
    if (!els.contextMenu.contains(e.target) && !e.target.closest("[data-action^='kebab']")) {
      closeContextMenu();
    }
  });

  function kebabItemsForRunStop(dog) {
    return [
      { label: "View details", onSelect: () => openDetailSheet(dog.id) },
      { label: "Remove from run", danger: true, onSelect: () => removeFromRun(dog.id) },
    ];
  }

  function kebabItemsForManageDog(dog) {
    const items = [{ label: "View details", onSelect: () => openDetailSheet(dog.id) }];
    if (!dog.archived) {
      items.push({ label: "Archive dog", danger: true, onSelect: () => archiveDog(dog.id, true) });
    } else {
      items.push({ label: "Restore dog", onSelect: () => archiveDog(dog.id, false) });
    }
    return items;
  }

  // -------------------------------------------------------------------
  // New run sheet
  // -------------------------------------------------------------------
  function openNewRunSheet() {
    const todayIso = toISODate(new Date());
    els.newRunSheet.innerHTML = `
      <div class="sheet-handle"></div>
      <div class="sheet-header">
        <h2 class="sheet-title">New run</h2>
        <button type="button" class="sheet-close" data-action="close-new-run">✕</button>
      </div>
      <form id="newRunForm">
        <div class="field-group">
          <span class="field-label">Title *</span>
          <input class="field-input" id="newRunTitle" placeholder="e.g. Justin + Nigel AM" required />
        </div>
        <div class="field-group">
          <span class="field-label">Date *</span>
          <input class="field-input" id="newRunDate" type="date" value="${todayIso}" required />
        </div>
        <div class="sheet-actions">
          <button type="submit" class="primary-btn" style="flex:1;">Create run</button>
        </div>
      </form>
    `;

    els.newRunSheet.querySelector("[data-action='close-new-run']").addEventListener("click", closeNewRunSheet);
    els.newRunSheet.querySelector("#newRunForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const title = els.newRunSheet.querySelector("#newRunTitle").value.trim();
      const date = els.newRunSheet.querySelector("#newRunDate").value;
      if (!title || !date) {
        toast("Title and date are required");
        return;
      }
      try {
        const run = await api.createRun({ title, date });
        state.runs.push(run);
        closeNewRunSheet();
        state.weekStart = startOfWeek(new Date(`${date}T00:00:00`));
        renderCalendar();
        openRun(run.id);
        openAddDogsScreen();
        toast(`"${run.title}" created — add some dogs`);
      } catch (err) {
        toast(err.message || "Failed to create run");
      }
    });

    els.newRunOverlay.hidden = false;
  }

  function closeNewRunSheet() {
    els.newRunOverlay.hidden = true;
    els.newRunSheet.innerHTML = "";
  }

  // -------------------------------------------------------------------
  // Dog detail sheet
  // -------------------------------------------------------------------
  function openDetailSheet(dogId) {
    const dog = dogById(dogId);
    if (!dog) return;
    renderDetailSheet(dog);
    els.detailOverlay.hidden = false;
  }

  function closeDetailSheet() {
    els.detailOverlay.hidden = true;
    els.detailSheet.innerHTML = "";
  }

  function renderDetailSheet(dog) {
    els.detailSheet.innerHTML = `
      <div class="sheet-handle"></div>
      <div class="sheet-header">
        <h2 class="sheet-title">${escapeHtml(dog.name)}</h2>
        <button type="button" class="sheet-close" data-action="close-detail">✕</button>
      </div>

      <div class="photo-upload">
        ${dogAvatarHtml(dog).replace("dog-avatar", "dog-avatar photo-preview")}
        <div>
          <label class="text-btn" for="photoInput" style="cursor:pointer;">Change photo</label>
          <input type="file" id="photoInput" accept="image/*" hidden />
        </div>
      </div>

      <div class="field-group">
        <span class="field-label">Address</span>
        <input class="field-input" id="fieldAddress" value="${escapeHtml(dog.address)}" />
      </div>
      <div class="field-group">
        <span class="field-label">Postcode</span>
        <input class="field-input mono" id="fieldPostcode" value="${escapeHtml(dog.postcode)}" />
      </div>
      <div class="field-group">
        <span class="field-label">Keysafe code</span>
        <input class="field-input mono" id="fieldKeysafe" value="${escapeHtml(dog.keysafe)}" placeholder="e.g. 1234" />
      </div>
      <div class="field-group">
        <span class="field-label">Instructions</span>
        <textarea class="field-textarea" id="fieldInstructions" placeholder="Any special instructions…">${escapeHtml(dog.instructions)}</textarea>
      </div>
      <div class="field-group">
        <span class="field-label">Phone</span>
        <input class="field-input" id="fieldPhone" value="${escapeHtml(dog.phone)}" placeholder="Owner phone" />
        ${dog.phone ? `<div class="field-value" style="margin-top:6px;"><a class="tel-link" href="tel:${escapeHtml(dog.phone)}">Call ${escapeHtml(dog.phone)}</a></div>` : ""}
      </div>

      <div class="field-group">
        <span class="field-label">Notes</span>
        <div class="notes-log">
          ${
            dog.notes.length
              ? dog.notes
                  .map(
                    (n) => `
                <div class="note-item">
                  <div>${escapeHtml(n.text)}</div>
                  <div class="note-meta">${formatDateTime(n.createdAt)}</div>
                </div>`
                  )
                  .join("")
              : `<div class="hint-text" style="margin:0;">No notes yet.</div>`
          }
        </div>
        <textarea class="field-textarea" id="newNoteText" placeholder="Add a note…"></textarea>
        <button type="button" class="secondary-btn" id="addNoteBtn" style="margin-top:8px;width:100%;">Add note</button>
      </div>

      <div class="sheet-actions">
        <button type="button" class="secondary-btn" id="archiveBtn" style="flex:1;">
          ${dog.archived ? "Restore dog" : "Archive dog"}
        </button>
        <button type="button" class="primary-btn" id="saveFieldsBtn">Save</button>
      </div>
    `;

    els.detailSheet.querySelector("#photoInput").addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const { photoPath } = await api.uploadPhoto(dog.id, file);
        dog.photoPath = photoPath;
        const idx = state.dogs.findIndex((d) => d.id === dog.id);
        if (idx !== -1) state.dogs[idx].photoPath = photoPath;
        renderDetailSheet(dog);
        renderManageDogsList();
        renderRunScreen();
        renderPickerList();
        toast("Photo updated");
      } catch (err) {
        toast(err.message || "Photo upload failed");
      }
    });

    els.detailSheet.querySelector("#addNoteBtn").addEventListener("click", async () => {
      const textarea = els.detailSheet.querySelector("#newNoteText");
      const text = textarea.value.trim();
      if (!text) return;
      try {
        const note = await api.addNote(dog.id, text);
        dog.notes.unshift(note);
        textarea.value = "";
        renderDetailSheet(dog);
        toast("Note added");
      } catch (err) {
        toast(err.message || "Failed to add note");
      }
    });

    els.detailSheet.querySelector("#saveFieldsBtn").addEventListener("click", async () => {
      const payload = {
        address: els.detailSheet.querySelector("#fieldAddress").value.trim(),
        postcode: els.detailSheet.querySelector("#fieldPostcode").value.trim(),
        keysafe: els.detailSheet.querySelector("#fieldKeysafe").value.trim(),
        instructions: els.detailSheet.querySelector("#fieldInstructions").value.trim(),
        phone: els.detailSheet.querySelector("#fieldPhone").value.trim(),
      };
      try {
        const updated = await api.patchDog(dog.id, payload);
        const idx = state.dogs.findIndex((d) => d.id === dog.id);
        if (idx !== -1) state.dogs[idx] = { ...state.dogs[idx], ...updated };
        renderManageDogsList();
        renderRunScreen();
        toast("Saved");
      } catch (err) {
        toast(err.message || "Failed to save");
      }
    });

    els.detailSheet.querySelector("#archiveBtn").addEventListener("click", async () => {
      await archiveDog(dog.id, !dog.archived);
      closeDetailSheet();
    });

    els.detailSheet.querySelector("[data-action='close-detail']").addEventListener("click", closeDetailSheet);
  }

  // -------------------------------------------------------------------
  // Add dog sheet (new dog form)
  // -------------------------------------------------------------------
  function openAddSheet() {
    els.addSheet.innerHTML = `
      <div class="sheet-handle"></div>
      <div class="sheet-header">
        <h2 class="sheet-title">Add dog</h2>
        <button type="button" class="sheet-close" data-action="close-add">✕</button>
      </div>
      <form id="addDogForm">
        <div class="field-group">
          <span class="field-label">Name *</span>
          <input class="field-input" id="newName" required />
        </div>
        <div class="field-group">
          <span class="field-label">Size *</span>
          <select class="field-select" id="newSize" required>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
        <div class="field-group">
          <span class="field-label">Address *</span>
          <input class="field-input" id="newAddress" required />
        </div>
        <div class="field-group">
          <span class="field-label">Postcode</span>
          <input class="field-input mono" id="newPostcode" />
        </div>
        <div class="field-group">
          <span class="field-label">Keysafe code</span>
          <input class="field-input mono" id="newKeysafe" />
        </div>
        <div class="field-group">
          <span class="field-label">Instructions</span>
          <textarea class="field-textarea" id="newInstructions"></textarea>
        </div>
        <div class="field-group">
          <span class="field-label">Phone</span>
          <input class="field-input" id="newPhone" />
        </div>
        <div class="sheet-actions">
          <button type="submit" class="primary-btn" style="flex:1;">Add dog</button>
        </div>
      </form>
    `;

    els.addSheet.querySelector("[data-action='close-add']").addEventListener("click", closeAddSheet);
    els.addSheet.querySelector("#addDogForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const payload = {
        name: els.addSheet.querySelector("#newName").value.trim(),
        size: els.addSheet.querySelector("#newSize").value,
        address: els.addSheet.querySelector("#newAddress").value.trim(),
        postcode: els.addSheet.querySelector("#newPostcode").value.trim(),
        keysafe: els.addSheet.querySelector("#newKeysafe").value.trim(),
        instructions: els.addSheet.querySelector("#newInstructions").value.trim(),
        phone: els.addSheet.querySelector("#newPhone").value.trim(),
      };
      if (!payload.name || !payload.address) {
        toast("Name and address are required");
        return;
      }
      try {
        const dog = await api.createDog(payload);
        state.dogs.push(dog);
        closeAddSheet();
        renderManageDogsList();
        toast(`${dog.name} added`);
      } catch (err) {
        toast(err.message || "Failed to add dog");
      }
    });

    els.addOverlay.hidden = false;
  }

  function closeAddSheet() {
    els.addOverlay.hidden = true;
    els.addSheet.innerHTML = "";
  }

  // -------------------------------------------------------------------
  // Event wiring
  // -------------------------------------------------------------------
  function wireEvents() {
    // Calendar screen
    els.manageDogsBtn.addEventListener("click", openManageDogsScreen);
    els.prevWeekBtn.addEventListener("click", () => changeWeek(-1));
    els.nextWeekBtn.addEventListener("click", () => changeWeek(1));
    els.weekLabel.addEventListener("click", () => {
      state.weekStart = startOfWeek(new Date());
      renderCalendar();
    });
    els.newRunFab.addEventListener("click", openNewRunSheet);
    els.agendaList.addEventListener("click", (e) => {
      const pill = e.target.closest("[data-run-id]");
      if (pill) openRun(pill.dataset.runId);
    });

    // Run detail screen
    els.runBackBtn.addEventListener("click", () => {
      switchScreen("calendar");
      renderCalendar();
    });
    els.runKebabBtn.addEventListener("click", () => {
      openContextMenu(els.runKebabBtn, [
        { label: "Delete run", danger: true, onSelect: deleteCurrentRun },
      ]);
    });
    els.runTitleInput.addEventListener("blur", async () => {
      const run = currentRun();
      if (!run) return;
      const value = els.runTitleInput.value.trim();
      if (!value || value === run.title) {
        els.runTitleInput.value = run.title;
        return;
      }
      try {
        const updated = await api.patchRun(run.id, { title: value });
        Object.assign(run, updated);
        renderCalendar();
      } catch (err) {
        els.runTitleInput.value = run.title;
        toast(err.message || "Failed to rename run");
      }
    });
    els.runDateInput.addEventListener("change", async () => {
      const run = currentRun();
      if (!run) return;
      const value = els.runDateInput.value;
      if (!value || value === run.date) return;
      try {
        const updated = await api.patchRun(run.id, { date: value });
        Object.assign(run, updated);
        renderCalendar();
        toast("Run moved");
      } catch (err) {
        els.runDateInput.value = run.date;
        toast(err.message || "Failed to move run");
      }
    });
    els.addDogsBtn.addEventListener("click", openAddDogsScreen);
    els.runStopsList.addEventListener("click", (e) => {
      const detailBtn = e.target.closest("[data-action='open-detail']");
      if (detailBtn) return openDetailSheet(detailBtn.dataset.dogId);
      const upBtn = e.target.closest("[data-action='move-up']");
      if (upBtn) return moveInRun(upBtn.dataset.dogId, -1);
      const downBtn = e.target.closest("[data-action='move-down']");
      if (downBtn) return moveInRun(downBtn.dataset.dogId, 1);
      const kebabBtn = e.target.closest("[data-action='kebab-run-stop']");
      if (kebabBtn) {
        const dog = dogById(kebabBtn.dataset.dogId);
        if (dog) openContextMenu(kebabBtn, kebabItemsForRunStop(dog));
      }
    });

    // Add dogs screen
    els.addDogsBackBtn.addEventListener("click", () => {
      renderRunScreen();
      switchScreen("run");
    });
    els.addDogsSearch.addEventListener(
      "input",
      debounce((e) => {
        state.addDogsSearch = e.target.value;
        renderPickerList();
      }, 150)
    );
    els.pickerDogList.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-action='toggle-pick']");
      if (btn) togglePick(btn.dataset.dogId);
    });

    // Manage dogs screen
    els.manageDogsBackBtn.addEventListener("click", () => {
      switchScreen("calendar");
      renderCalendar();
    });
    els.manageDogsSearch.addEventListener(
      "input",
      debounce((e) => {
        state.manageDogsSearch = e.target.value;
        renderManageDogsList();
      }, 150)
    );
    els.addDogFab.addEventListener("click", openAddSheet);
    els.manageDogList.addEventListener("click", (e) => {
      const detailBtn = e.target.closest("[data-action='open-detail']");
      if (detailBtn) return openDetailSheet(detailBtn.dataset.dogId);
      const kebabBtn = e.target.closest("[data-action='kebab-manage']");
      if (kebabBtn) {
        const dog = dogById(kebabBtn.dataset.dogId);
        if (dog) openContextMenu(kebabBtn, kebabItemsForManageDog(dog));
      }
    });

    // Overlays
    els.newRunOverlay.addEventListener("click", (e) => {
      if (e.target === els.newRunOverlay) closeNewRunSheet();
    });
    els.detailOverlay.addEventListener("click", (e) => {
      if (e.target === els.detailOverlay) closeDetailSheet();
    });
    els.addOverlay.addEventListener("click", (e) => {
      if (e.target === els.addOverlay) closeAddSheet();
    });
  }

  // -------------------------------------------------------------------
  // Init
  // -------------------------------------------------------------------
  async function init() {
    wireEvents();
    try {
      const [dogs, runs] = await Promise.all([api.getDogs(), api.getRuns()]);
      state.dogs = dogs;
      state.runs = runs;
      renderCalendar();
    } catch (err) {
      toast(err.message || "Failed to load data");
      console.error(err);
    }
  }

  init();
})();
