document.addEventListener('DOMContentLoaded', () => {
  const scheduleContainer = document.getElementById('schedule-container');
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const clearBtn = document.getElementById('clear-btn');

  let allTalks = [];

  // Fetch talks from the API
  const fetchTalks = async () => {
    try {
      const response = await fetch('/api/talks');
      if (!response.ok) {
        throw new Error('Failed to fetch talks data.');
      }
      allTalks = await response.json();
      renderSchedule(allTalks);
    } catch (error) {
      console.error(error);
      scheduleContainer.innerHTML = '<p class="loading-msg" style="color: #ef4444;">Error loading schedule. Please try again later.</p>';
    }
  };

  // Render the schedule cards
  const renderSchedule = (talks) => {
    scheduleContainer.innerHTML = ''; // Clear container

    if (talks.length === 0) {
      scheduleContainer.innerHTML = '<p class="no-results">No talks found matching your search.</p>';
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
        const tagsHTML = talk.category.map(cat => `<span class="tag">${cat}</span>`).join('');
        
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

  // Handle Search Submission
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim().toLowerCase();
    
    if (query === '') {
      renderSchedule(allTalks);
      clearBtn.classList.add('hidden');
      return;
    }

    clearBtn.classList.remove('hidden');

    const filteredTalks = allTalks.filter(talk => {
      // Breaks are typically not filtered, but we can hide them during search if wanted.
      // Let's include breaks if they match or just filter talks.
      if (talk.type === 'break') return false; 
      
      const matchesCategory = talk.category.some(cat => cat.toLowerCase().includes(query));
      const matchesSpeaker = talk.speakers.some(speaker => speaker.toLowerCase().includes(query));
      
      return matchesCategory || matchesSpeaker;
    });

    renderSchedule(filteredTalks);
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
