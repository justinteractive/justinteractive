(function () {
  "use strict";

  // -------------------------------------------------------------------
  // Constants
  // -------------------------------------------------------------------
  const MAX_MAPS_WAYPOINTS = 10; // Google Maps deep-link practical limit.

  // Rough centroids for "sort by nearby" — a coarse district-level
  // approximation, not real geocoding/routing.
  const DISTRICT_CENTROIDS = {
    CT1: { lat: 51.2802, lng: 1.0789 },
    CT2: { lat: 51.2917, lng: 1.073 },
    CT3: { lat: 51.3103, lng: 1.169 },
    CT4: { lat: 51.247, lng: 1.045 },
    ME13: { lat: 51.314, lng: 0.893 },
  };
  const DEPOT = { lat: 51.2796, lng: 1.0827 }; // Canterbury depot fallback.

  // -------------------------------------------------------------------
  // DOM refs
  // -------------------------------------------------------------------
  const els = {
    modeButtons: document.querySelectorAll(".mode-btn"),
    tabButtons: document.querySelectorAll(".tab-chip"),
    routeCount: document.getElementById("routeCount"),
    allDogsTab: document.getElementById("allDogsTab"),
    routeTab: document.getElementById("routeTab"),
    searchInput: document.getElementById("searchInput"),
    selectToggleBtn: document.getElementById("selectToggleBtn"),
    dogList: document.getElementById("dogList"),
    routeList: document.getElementById("routeList"),
    routeEmptyState: document.getElementById("routeEmptyState"),
    sortNearbyBtn: document.getElementById("sortNearbyBtn"),
    openMapsBtn: document.getElementById("openMapsBtn"),
    flipModeBtn: document.getElementById("flipModeBtn"),
    mapsLimitHint: document.getElementById("mapsLimitHint"),
    selectBar: document.getElementById("selectBar"),
    selectCount: document.getElementById("selectCount"),
    selectCancelBtn: document.getElementById("selectCancelBtn"),
    selectAddBtn: document.getElementById("selectAddBtn"),
    saveBar: document.getElementById("saveBar"),
    saveStatus: document.getElementById("saveStatus"),
    saveRouteBtn: document.getElementById("saveRouteBtn"),
    addDogFab: document.getElementById("addDogFab"),
    contextMenu: document.getElementById("contextMenu"),
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
    routes: {
      am: { dogIds: [], savedAt: null },
      pm: { dogIds: [], savedAt: null },
    },
    routeDirty: { am: false, pm: false },
    currentMode: localStorage.getItem("theround.mode") === "pm" ? "pm" : "am",
    activeTab: "all",
    search: "",
    showArchived: false,
    selectMode: false,
    selectedIds: new Set(),
  };

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
    async getRoute(mode) {
      const res = await fetch(`api/routes/${mode}`);
      if (!res.ok) throw new Error("Failed to load route");
      return res.json();
    },
    async putRoute(mode, dogIds) {
      const res = await fetch(`api/routes/${mode}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dogIds }),
      });
      if (!res.ok) throw await apiError(res);
      return res.json();
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

  function haversine(a, b) {
    const R = 6371;
    const dLat = ((b.lat - a.lat) * Math.PI) / 180;
    const dLng = ((b.lng - a.lng) * Math.PI) / 180;
    const lat1 = (a.lat * Math.PI) / 180;
    const lat2 = (b.lat * Math.PI) / 180;
    const h =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }

  function centroidFor(dog) {
    return DISTRICT_CENTROIDS[dog.district] || DEPOT;
  }

  function dogById(id) {
    return state.dogs.find((d) => d.id === id);
  }

  function currentRoute() {
    return state.routes[state.currentMode];
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

  // -------------------------------------------------------------------
  // Rendering — top bar
  // -------------------------------------------------------------------
  function renderTopBar() {
    els.modeButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.mode === state.currentMode);
    });
    els.tabButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === state.activeTab);
    });
    els.routeCount.textContent = String(currentRoute().dogIds.length);

    els.allDogsTab.hidden = state.activeTab !== "all";
    els.routeTab.hidden = state.activeTab !== "route";
    els.addDogFab.hidden = state.activeTab !== "all" || state.selectMode;

    els.flipModeBtn.textContent =
      state.currentMode === "am" ? "Flip to PM route" : "Flip to AM route";
  }

  // -------------------------------------------------------------------
  // Rendering — All dogs tab
  // -------------------------------------------------------------------
  function filteredDogs() {
    const q = state.search.trim().toLowerCase();
    return state.dogs
      .filter((d) => state.showArchived || !d.archived)
      .filter((d) => {
        if (!q) return true;
        return (
          d.name.toLowerCase().includes(q) ||
          d.address.toLowerCase().includes(q) ||
          (d.postcode || "").toLowerCase().includes(q)
        );
      });
  }

  function dogAvatarHtml(dog) {
    if (dog.photoPath) {
      return `<img class="dog-avatar" src="${escapeHtml(dog.photoPath)}" alt="" />`;
    }
    const initial = (dog.name || "?").trim().charAt(0).toUpperCase();
    return `<div class="dog-avatar">${escapeHtml(initial)}</div>`;
  }

  function renderAllDogsTab() {
    const dogs = filteredDogs();
    const routeIds = new Set(currentRoute().dogIds);

    if (dogs.length === 0) {
      els.dogList.innerHTML = `<li class="empty-state">No dogs match your search.</li>`;
      return;
    }

    els.dogList.innerHTML = dogs
      .map((dog) => {
        const rowClasses = ["dog-row"];
        if (routeIds.has(dog.id) && !dog.archived) rowClasses.push("in-route");
        if (dog.archived) rowClasses.push("archived");

        const checkbox = state.selectMode
          ? `<input type="checkbox" class="dog-checkbox" data-select-id="${dog.id}" ${
              state.selectedIds.has(dog.id) ? "checked" : ""
            } ${dog.archived ? "disabled" : ""} />`
          : "";

        const keysafe = dog.keysafe
          ? `<span class="keysafe-chip mono" title="Keysafe code">${escapeHtml(dog.keysafe)}</span>`
          : "";

        return `
          <li class="${rowClasses.join(" ")}" data-dog-id="${dog.id}">
            ${checkbox}
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
            <button type="button" class="kebab-btn" data-action="kebab-all" data-dog-id="${dog.id}" aria-label="More options">⋮</button>
          </li>
        `;
      })
      .join("");
  }

  // -------------------------------------------------------------------
  // Rendering — Today's route tab
  // -------------------------------------------------------------------
  function renderRouteTab() {
    const route = currentRoute();
    const dogs = route.dogIds.map((id) => dogById(id)).filter(Boolean);

    els.routeEmptyState.hidden = dogs.length > 0;
    els.routeList.hidden = dogs.length === 0;
    els.mapsLimitHint.hidden = dogs.length <= MAX_MAPS_WAYPOINTS;
    if (dogs.length > MAX_MAPS_WAYPOINTS) {
      els.mapsLimitHint.textContent = `"Open in Maps" only supports the first ${MAX_MAPS_WAYPOINTS} stops — Google Maps' deep-link waypoint limit.`;
    }

    els.routeList.innerHTML = dogs
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
            <button type="button" class="kebab-btn" data-action="kebab-route" data-dog-id="${dog.id}" aria-label="More options">⋮</button>
          </li>
        `;
      })
      .join("");

    renderSaveBar();
  }

  function renderSaveBar() {
    const dirty = state.routeDirty[state.currentMode];
    const route = currentRoute();
    els.saveBar.hidden = state.activeTab !== "route" || route.dogIds.length === 0;
    els.saveRouteBtn.disabled = !dirty;
    if (dirty) {
      els.saveStatus.textContent = "Unsaved changes";
    } else if (route.savedAt) {
      els.saveStatus.textContent = `Saved ${formatDateTime(route.savedAt)}`;
    } else {
      els.saveStatus.textContent = "Not saved yet";
    }
  }

  function markDirty() {
    state.routeDirty[state.currentMode] = true;
    renderSaveBar();
    renderTopBar();
  }

  // -------------------------------------------------------------------
  // Select-mode bar (All dogs tab)
  // -------------------------------------------------------------------
  function renderSelectBar() {
    els.selectBar.hidden = !state.selectMode;
    els.selectCount.textContent = `${state.selectedIds.size} selected`;
    els.selectAddBtn.disabled = state.selectedIds.size === 0;
  }

  // -------------------------------------------------------------------
  // Full re-render
  // -------------------------------------------------------------------
  function renderAll() {
    renderTopBar();
    renderAllDogsTab();
    renderRouteTab();
    renderSelectBar();
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

    // Clamp vertically after render (menu height depends on content).
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

  function kebabItemsForAllDogs(dog) {
    const inRoute = currentRoute().dogIds.includes(dog.id);
    const items = [
      { label: "View details", onSelect: () => openDetailSheet(dog.id) },
    ];
    if (!dog.archived) {
      items.push({
        label: inRoute ? "Remove from today's route" : "Add to today's route",
        onSelect: () => toggleDogInRoute(dog.id, !inRoute),
      });
      items.push({
        label: "Archive dog",
        danger: true,
        onSelect: () => archiveDog(dog.id, true),
      });
    } else {
      items.push({
        label: "Restore dog",
        onSelect: () => archiveDog(dog.id, false),
      });
    }
    return items;
  }

  function kebabItemsForRoute(dog) {
    return [
      { label: "View details", onSelect: () => openDetailSheet(dog.id) },
      {
        label: "Remove from route",
        danger: true,
        onSelect: () => toggleDogInRoute(dog.id, false),
      },
    ];
  }

  // -------------------------------------------------------------------
  // Route mutation helpers
  // -------------------------------------------------------------------
  function toggleDogInRoute(dogId, add) {
    const route = currentRoute();
    const idx = route.dogIds.indexOf(dogId);
    if (add && idx === -1) {
      route.dogIds.push(dogId);
    } else if (!add && idx !== -1) {
      route.dogIds.splice(idx, 1);
    } else {
      return;
    }
    markDirty();
    renderAllDogsTab();
    renderRouteTab();
    toast(add ? "Added to today's route" : "Removed from route");
  }

  function moveInRoute(dogId, direction) {
    const route = currentRoute();
    const idx = route.dogIds.indexOf(dogId);
    const swapWith = idx + direction;
    if (idx === -1 || swapWith < 0 || swapWith >= route.dogIds.length) return;
    const arr = route.dogIds;
    [arr[idx], arr[swapWith]] = [arr[swapWith], arr[idx]];
    markDirty();
    renderRouteTab();
  }

  async function archiveDog(dogId, archived) {
    try {
      const updated = await api.patchDog(dogId, { archived });
      const idx = state.dogs.findIndex((d) => d.id === dogId);
      if (idx !== -1) state.dogs[idx] = updated;
      if (archived) {
        ["am", "pm"].forEach((mode) => {
          const before = state.routes[mode].dogIds.length;
          state.routes[mode].dogIds = state.routes[mode].dogIds.filter(
            (id) => id !== dogId
          );
          if (state.routes[mode].dogIds.length !== before) {
            state.routeDirty[mode] = true;
          }
        });
      }
      renderAll();
      toast(archived ? "Dog archived" : "Dog restored");
    } catch (err) {
      toast(err.message || "Something went wrong");
    }
  }

  async function saveRoute() {
    const mode = state.currentMode;
    try {
      const result = await api.putRoute(mode, state.routes[mode].dogIds);
      state.routes[mode].savedAt = result.savedAt;
      state.routeDirty[mode] = false;
      renderSaveBar();
      toast("Route saved");
    } catch (err) {
      toast(err.message || "Failed to save route");
    }
  }

  async function sortByNearby() {
    const route = currentRoute();
    const dogs = route.dogIds.map((id) => dogById(id)).filter(Boolean);
    if (dogs.length < 2) return;

    const start = await getStartingPoint();
    const remaining = dogs.slice();
    const ordered = [];
    let current = start;

    while (remaining.length) {
      let bestIndex = 0;
      let bestDist = Infinity;
      remaining.forEach((dog, i) => {
        const dist = haversine(current, centroidFor(dog));
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = i;
        }
      });
      const [next] = remaining.splice(bestIndex, 1);
      ordered.push(next);
      current = centroidFor(next);
    }

    route.dogIds = ordered.map((d) => d.id);
    markDirty();
    renderRouteTab();
    toast("Sorted by nearby (approximate)");
  }

  function getStartingPoint() {
    return new Promise((resolve) => {
      if (!navigator.geolocation) return resolve(DEPOT);
      const timer = setTimeout(() => resolve(DEPOT), 4000);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          clearTimeout(timer);
          resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        () => {
          clearTimeout(timer);
          resolve(DEPOT);
        },
        { timeout: 3800, maximumAge: 60000 }
      );
    });
  }

  // -------------------------------------------------------------------
  // Detail sheet
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
    const inRoute = currentRoute().dogIds.includes(dog.id);

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
        <button type="button" class="secondary-btn" id="toggleRouteBtn">
          ${inRoute ? "Remove from today's route" : "Add to today's route"}
        </button>
        <button type="button" class="primary-btn" id="saveFieldsBtn">Save</button>
      </div>
      <div class="sheet-actions">
        <button type="button" class="secondary-btn" id="archiveBtn">
          ${dog.archived ? "Restore dog" : "Archive dog"}
        </button>
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
        renderAllDogsTab();
        renderRouteTab();
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
        renderAllDogsTab();
        renderRouteTab();
        toast("Saved");
      } catch (err) {
        toast(err.message || "Failed to save");
      }
    });

    els.detailSheet.querySelector("#toggleRouteBtn").addEventListener("click", () => {
      toggleDogInRoute(dog.id, !currentRoute().dogIds.includes(dog.id));
      renderDetailSheet(dog);
    });

    els.detailSheet.querySelector("#archiveBtn").addEventListener("click", async () => {
      await archiveDog(dog.id, !dog.archived);
      closeDetailSheet();
    });

    els.detailSheet.querySelector("[data-action='close-detail']").addEventListener("click", closeDetailSheet);
  }

  // -------------------------------------------------------------------
  // Add dog sheet
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
        renderAllDogsTab();
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
  function switchMode(mode) {
    if (mode === state.currentMode) return;
    if (state.routeDirty[state.currentMode]) {
      const ok = confirm("You have unsaved route changes. Switch anyway?");
      if (!ok) return;
    }
    state.currentMode = mode;
    localStorage.setItem("theround.mode", mode);
    renderAll();
  }

  function switchTab(tab) {
    state.activeTab = tab;
    if (tab !== "all" && state.selectMode) {
      state.selectMode = false;
      state.selectedIds.clear();
    }
    renderAll();
  }

  function wireEvents() {
    els.modeButtons.forEach((btn) =>
      btn.addEventListener("click", () => switchMode(btn.dataset.mode))
    );
    els.tabButtons.forEach((btn) =>
      btn.addEventListener("click", () => switchTab(btn.dataset.tab))
    );
    els.flipModeBtn.addEventListener("click", () =>
      switchMode(state.currentMode === "am" ? "pm" : "am")
    );

    els.searchInput.addEventListener(
      "input",
      debounce((e) => {
        state.search = e.target.value;
        renderAllDogsTab();
      }, 150)
    );

    els.selectToggleBtn.addEventListener("click", () => {
      state.selectMode = !state.selectMode;
      state.selectedIds.clear();
      renderTopBar();
      renderAllDogsTab();
      renderSelectBar();
    });

    els.selectCancelBtn.addEventListener("click", () => {
      state.selectMode = false;
      state.selectedIds.clear();
      renderTopBar();
      renderAllDogsTab();
      renderSelectBar();
    });

    els.selectAddBtn.addEventListener("click", () => {
      const route = currentRoute();
      let added = 0;
      state.selectedIds.forEach((id) => {
        if (!route.dogIds.includes(id)) {
          route.dogIds.push(id);
          added++;
        }
      });
      if (added > 0) markDirty();
      state.selectMode = false;
      state.selectedIds.clear();
      state.activeTab = "route";
      renderAll();
      toast(`${added} dog${added === 1 ? "" : "s"} added to route`);
    });

    els.saveRouteBtn.addEventListener("click", saveRoute);
    els.sortNearbyBtn.addEventListener("click", sortByNearby);
    els.addDogFab.addEventListener("click", openAddSheet);

    els.openMapsBtn.addEventListener("click", () => {
      const dogs = currentRoute().dogIds.map((id) => dogById(id)).filter(Boolean);
      if (dogs.length === 0) {
        toast("No stops in today's route yet");
        return;
      }
      window.open(mapsMultiStopLink(dogs), "_blank", "noopener");
    });

    els.detailOverlay.addEventListener("click", (e) => {
      if (e.target === els.detailOverlay) closeDetailSheet();
    });
    els.addOverlay.addEventListener("click", (e) => {
      if (e.target === els.addOverlay) closeAddSheet();
    });

    // Delegated clicks: All dogs list
    els.dogList.addEventListener("click", (e) => {
      const checkbox = e.target.closest("[data-select-id]");
      if (checkbox) {
        const id = checkbox.dataset.selectId;
        if (checkbox.checked) state.selectedIds.add(id);
        else state.selectedIds.delete(id);
        renderSelectBar();
        return;
      }

      const detailBtn = e.target.closest("[data-action='open-detail']");
      if (detailBtn) {
        if (state.selectMode) {
          const id = detailBtn.dataset.dogId;
          const dog = dogById(id);
          if (dog && dog.archived) return;
          if (state.selectedIds.has(id)) state.selectedIds.delete(id);
          else state.selectedIds.add(id);
          renderAllDogsTab();
          renderSelectBar();
        } else {
          openDetailSheet(detailBtn.dataset.dogId);
        }
        return;
      }

      const kebabBtn = e.target.closest("[data-action='kebab-all']");
      if (kebabBtn) {
        const dog = dogById(kebabBtn.dataset.dogId);
        if (dog) openContextMenu(kebabBtn, kebabItemsForAllDogs(dog));
      }
    });

    // Delegated clicks: Route list
    els.routeList.addEventListener("click", (e) => {
      const detailBtn = e.target.closest("[data-action='open-detail']");
      if (detailBtn) {
        openDetailSheet(detailBtn.dataset.dogId);
        return;
      }
      const upBtn = e.target.closest("[data-action='move-up']");
      if (upBtn) return moveInRoute(upBtn.dataset.dogId, -1);
      const downBtn = e.target.closest("[data-action='move-down']");
      if (downBtn) return moveInRoute(downBtn.dataset.dogId, 1);
      const kebabBtn = e.target.closest("[data-action='kebab-route']");
      if (kebabBtn) {
        const dog = dogById(kebabBtn.dataset.dogId);
        if (dog) openContextMenu(kebabBtn, kebabItemsForRoute(dog));
      }
    });

    window.addEventListener("beforeunload", (e) => {
      const anyDirty = state.routeDirty.am || state.routeDirty.pm;
      if (anyDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    });
  }

  // -------------------------------------------------------------------
  // Init
  // -------------------------------------------------------------------
  async function init() {
    wireEvents();
    try {
      const [dogs, amRoute, pmRoute] = await Promise.all([
        api.getDogs(),
        api.getRoute("am"),
        api.getRoute("pm"),
      ]);
      state.dogs = dogs;
      state.routes.am = amRoute;
      state.routes.pm = pmRoute;
      renderAll();
    } catch (err) {
      toast(err.message || "Failed to load data");
      console.error(err);
    }
  }

  init();
})();
