document.addEventListener('DOMContentLoaded', () => {
  const scheduleContainer = document.getElementById('schedule-container');
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const clearBtn = document.getElementById('clear-btn');

  let allTalks = [];

  // Show skeleton loading state
  const renderSkeletons = () => {
    scheduleContainer.innerHTML = '';
    for (let i = 0; i < 4; i++) {
      const skeleton = document.createElement('div');
      skeleton.className = 'card skeleton-card';
      skeleton.innerHTML = `
        <div class="time-slot skeleton"></div>
        <div class="card-content">
          <div class="title skeleton skeleton-text"></div>
          <div class="speakers skeleton skeleton-text" style="width: 60%"></div>
          <div class="description skeleton skeleton-text" style="width: 90%"></div>
          <div class="categories">
            <div class="tag skeleton" style="width: 60px"></div>
            <div class="tag skeleton" style="width: 80px"></div>
          </div>
        </div>
      `;
      scheduleContainer.appendChild(skeleton);
    }
  };

  // Fetch talks from the API
  const fetchTalks = async () => {
    renderSkeletons();
    try {
      // Add a slight delay to demonstrate skeletons if desired, 
      // but let's keep it snappy for real use.
      const response = await fetch('/api/talks');
      if (!response.ok) {
        throw new Error('Failed to fetch talks data.');
      }
      allTalks = await response.json();
      renderSchedule(allTalks);
    } catch (error) {
      console.error(error);
      scheduleContainer.innerHTML = `
        <div class="no-results">
          <p style="color: #ef4444;">Error loading schedule. Please try again later.</p>
          <button type="button" class="btn btn-secondary" onclick="location.reload()">Retry</button>
        </div>
      `;
    }
  };

  // Render the schedule cards
  const renderSchedule = (talks) => {
    scheduleContainer.innerHTML = ''; // Clear container

    if (talks.length === 0) {
      scheduleContainer.innerHTML = `
        <div class="no-results">
          <p>No talks found matching your search.</p>
          <button type="button" class="btn btn-secondary" id="empty-state-clear-btn">Clear Search</button>
        </div>
      `;
      document.getElementById('empty-state-clear-btn').addEventListener('click', () => clearBtn.click());
      return;
    }

    talks.forEach(talk => {
      const isBreak = talk.type === 'break';
      const card = document.createElement('div');
      card.className = `card ${isBreak ? 'break' : ''}`;

      let contentHTML = `
        <div class="time-slot">
          ${talk.startTime} <span>- ${talk.endTime}</span>
        </div>
        <div class="card-content">
          <div class="title">${talk.title}</div>
      `;

      if (!isBreak) {
        const speakersStr = talk.speakers.join(', ');
        const tagsHTML = talk.category.map(cat => {
          const className = cat.toLowerCase().replace(/\s+/g, '-');
          return `<span class="tag tag-${className}">${cat}</span>`;
        }).join('');
        
        contentHTML += `
          <div class="speakers">By ${speakersStr}</div>
          <div class="description">${talk.description}</div>
          <div class="categories">${tagsHTML}</div>
        `;
      } else {
        contentHTML += `<div class="description">${talk.description}</div>`;
      }

      contentHTML += `</div>`; // Close card-content
      card.innerHTML = contentHTML;
      scheduleContainer.appendChild(card);
    });
  };

  // Handle Search Logic
  const handleSearch = () => {
    const query = searchInput.value.trim().toLowerCase();
    
    if (query === '') {
      renderSchedule(allTalks);
      clearBtn.classList.add('hidden');
      return;
    }

    clearBtn.classList.remove('hidden');

    const filteredTalks = allTalks.filter(talk => {
      if (talk.type === 'break') return false; 
      
      const matchesCategory = talk.category.some(cat => cat.toLowerCase().includes(query));
      const matchesSpeaker = talk.speakers.some(speaker => speaker.toLowerCase().includes(query));
      
      return matchesCategory || matchesSpeaker;
    });

    renderSchedule(filteredTalks);
  };

  // Event Listeners
  searchInput.addEventListener('input', handleSearch);

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSearch();
  });

  // Handle Clear Search
  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.classList.add('hidden');
    renderSchedule(allTalks);
  });

  // Initial fetch
  fetchTalks();
});
