document.addEventListener('DOMContentLoaded', () => {
    const directMap = (latitude, longitude, zoom = 25) => {
        if (window.map) {
            window.map.setView([latitude, longitude], zoom);
        }
    };

    document.addEventListener('osloStopsReady', (event) => {
        const menuButton = document.getElementById('menu-button');
        const menuIcon = document.getElementById('menu-icon');
        const menu = document.getElementById('menu');
        
        let isExpanded = false;

        const items = [...new Set(event.detail.map(stop => stop.name))].sort((a, b) => a.localeCompare(b, 'nb'));
        
        const searchBar = document.getElementById('search-bar');
        const itemList = document.getElementById('item-list');
        
        let itemsPerPage = 50;
        let currentPage = 1;
        let filteredItems = items;

        function loadItems(page) {
            const start = (page - 1) * itemsPerPage;
            const end = page * itemsPerPage;
            const fragment = document.createDocumentFragment();
            const currentItems = filteredItems.slice(start, end);

            currentItems.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                fragment.appendChild(li);

                li.addEventListener('click', () => {
                    const stop = event.detail.find(stop => stop.name === item);
                    if (stop) {
                        directMap(stop.latitude, stop.longitude);
                    }

                    li.classList.add('touch-feedback');
                    setTimeout(() => {
                        li.classList.remove('touch-feedback');
                        isExpanded = false;
                        menu.classList.remove('expanded');
                        if (menuIcon) {
                            menuIcon.classList.remove('fa-times');
                            menuIcon.classList.add('fa-bars');
                        }
                    }, 150);
                });
            });

            itemList.appendChild(fragment);
        }

        function updateItemList() {
            const searchQuery = searchBar.value.toLowerCase();
            filteredItems = items.filter(item => item.toLowerCase().includes(searchQuery));
            
            // Sort filtered items to prioritize items that start with the search term
            filteredItems.sort((a, b) => {
                const aStartsWith = a.toLowerCase().startsWith(searchQuery);
                const bStartsWith = b.toLowerCase().startsWith(searchQuery);
                if (aStartsWith && !bStartsWith) return -1;
                if (!aStartsWith && bStartsWith) return 1;
                return a.localeCompare(b, 'nb');
            });

            itemList.innerHTML = '';
            currentPage = 1;
            loadItems(currentPage);

            if (filteredItems.length === 0) {
                itemList.innerHTML = '<li>Ingen resultater.</li>'; 
            }
            itemList.scrollTop = 0; 
        }

        function debounce(func, wait) {
            let timeout;
            return function(...args) {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), wait);
            };
        }

        menuButton.addEventListener('click', () => {
            isExpanded = !isExpanded;
            menu.classList.toggle('expanded', isExpanded);
            if (menuIcon) {
                if (isExpanded) {
                    menuIcon.classList.remove('fa-bars');
                    menuIcon.classList.add('fa-times');
                } else {
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
            }
        });

        searchBar.addEventListener('input', debounce(updateItemList, 300));

        itemList.addEventListener('scroll', () => {
            if (itemList.scrollTop + itemList.clientHeight >= itemList.scrollHeight) {
                currentPage++;
                loadItems(currentPage);
            }
        });

        updateItemList();
    });
});