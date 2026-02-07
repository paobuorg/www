// Global Running Routes Explorer - Main Application
// ================================================

// Configuration
const CONFIG = {
    itemsPerLoad: 12,
    lazyLoadThreshold: 100,
    difficultyLevels: [
        { level: 1, name: '小白', color: '#22c55e', range: '<5km, <50m' },
        { level: 2, name: '新手', color: '#4ade80', range: '5-7km, 50-80m' },
        { level: 3, name: '学徒', color: '#86efac', range: '7-10km, 80-120m' },
        { level: 4, name: '跑者', color: '#a7f3d0', range: '10-12km, 120-180m' },
        { level: 5, name: '熟手', color: '#fcd34d', range: '12-15km, 180-250m' },
        { level: 6, name: '达人', color: '#fbbf24', range: '15-18km, 250-350m' },
        { level: 7, name: '高手', color: '#f59e0b', range: '18-21km, 350-500m' },
        { level: 8, name: '强者', color: '#fb923c', range: '21-25km, 500-700m' },
        { level: 9, name: '勇士', color: '#f97316', range: '25-30km, 700-900m' },
        { level: 10, name: '大师', color: '#ea580c', range: '30-35km, 900-1200m' },
        { level: 11, name: '宗师', color: '#dc2626', range: '35-42km, 1200-1600m' },
        { level: 12, name: '王者', color: '#b91c1c', range: '42-50km, 1600-2200m' },
        { level: 13, name: '传奇', color: '#991b1b', range: '50-70km, 2200-3000m' },
        { level: 14, name: '神话', color: '#7f1d1d', range: '>70km, >3000m' }
    ],
    continents: [
        { name: '亚洲', nameEn: 'Asia', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400' },
        { name: '欧洲', nameEn: 'Europe', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400' },
        { name: '北美洲', nameEn: 'North America', image: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=400' },
        { name: '南美洲', nameEn: 'South America', image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400' },
        { name: '非洲', nameEn: 'Africa', image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=400' },
        { name: '大洋洲', nameEn: 'Oceania', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400' }
    ],
    tagIcons: {
        '路跑': '🏃',
        '城市跑': '🏙️',
        '风景跑': '🌄',
        '文化跑': '🏛️',
        '环湖跑': '🌊',
        '马拉松': '🏁',
        '越野跑': '🏔️',
        '历史跑': '📜',
        '山地跑': '⛰️',
        '挑战跑': '💪',
        '夜景跑': '🌃',
        '滨江跑': '🌉',
        '火山跑': '🌋',
        '环形跑': '🔄',
        '森林跑': '🌲',
        '公园跑': '🌳',
        '桥梁跑': '🌉',
        '极限跑': '🎯',
        '高山跑': '🏔️',
        '赛事跑': '🏆',
        '海滨跑': '🏖️',
        '冰川跑': '🧊',
        '河畔跑': '🏞️',
        '浪漫跑': '💕',
        '古迹跑': '🏺',
        'UNESCO': '🏛️',
        '沙滩跑': '🏝️',
        '多日跑': '🎒',
        '峡湾跑': '🚢',
        '现代跑': '🏢',
        '花园跑': '🌸',
        '非洲之巅': '🌍'
    },
    tagColors: {
        '路跑': '#3b82f6',
        '城市跑': '#6366f1',
        '风景跑': '#10b981',
        '文化跑': '#8b5cf6',
        '环湖跑': '#06b6d4',
        '马拉松': '#ef4444',
        '越野跑': '#f97316',
        '历史跑': '#a855f7',
        '山地跑': '#dc2626',
        '挑战跑': '#f59e0b',
        '夜景跑': '#4f46e5',
        '滨江跑': '#0ea5e9',
        '火山跑': '#dc2626',
        '环形跑': '#22c55e',
        '森林跑': '#15803d',
        '公园跑': '#16a34a',
        '桥梁跑': '#0891b2',
        '极限跑': '#dc2626',
        '高山跑': '#991b1b',
        '赛事跑': '#fbbf24',
        '海滨跑': '#06b6d4',
        '冰川跑': '#60a5fa',
        '河畔跑': '#3b82f6',
        '浪漫跑': '#ec4899',
        '古迹跑': '#b45309',
        'UNESCO': '#f59e0b',
        '沙滩跑': '#fbbf24',
        '多日跑': '#8b5cf6',
        '峡湾跑': '#0ea5e9',
        '现代跑': '#64748b',
        '花园跑': '#f472b6',
        '非洲之巅': '#7c2d12'
    }
};

// State Management
const state = {
    routes: [],
    filteredRoutes: [],
    displayedRoutes: [],
    currentFilter: 'all',
    currentTag: null,
    currentDifficulty: null,
    currentContinent: null,
    currentCountry: null,
    currentRegion: null,
    currentCity: null,
    searchQuery: '',
    isLoading: false,
    loadOffset: 0,
    currentView: 'home',
    currentRouteId: null
};

// DOM Elements - with null check
const getElement = (id) => {
    const el = document.getElementById(id);
    if (!el) {
        console.warn(`Element with id '${id}' not found`);
    }
    return el;
};

const elements = {
    navToggle: getElement('navToggle'),
    navMenu: getElement('navMenu'),
    themeToggle: getElement('themeToggle'),
    searchToggle: getElement('searchToggle'),
    searchOverlay: getElement('searchOverlay'),
    searchInput: getElement('searchInput'),
    searchClose: getElement('searchClose'),
    searchResults: getElement('searchResults'),
    totalRoutes: getElement('totalRoutes'),
    totalCountries: getElement('totalCountries'),
    totalContinents: getElement('totalContinents'),
    breadcrumb: getElement('breadcrumb'),
    breadcrumbList: document.querySelector('.breadcrumb-list'),
    tagsCloud: getElement('tagsCloud'),
    difficultyGrid: getElement('difficultyGrid'),
    continentsGrid: getElement('continentsGrid'),
    routesWaterfall: getElement('routesWaterfall'),
    routesFilter: getElement('routesFilter'),
    loadingIndicator: getElement('loadingIndicator'),
    routeDetail: getElement('routeDetail'),
    routeDetailContent: getElement('routeDetailContent'),
    tagsSection: getElement('tags'),
    difficultySection: getElement('difficulty'),
    continentsSection: getElement('continents'),
    routesSection: getElement('routes')
};

// Utility Functions
const utils = {
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    shuffle: (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    },
    
    formatDistance: (km) => {
        if (km >= 10) return `${km.toFixed(1)} km`;
        return `${km.toFixed(2)} km`;
    },
    
    formatElevation: (m) => {
        return `${m} m`;
    },
    
    getUnique: (array, key) => {
        return [...new Set(array.map(item => item[key]))];
    },
    
    countBy: (array, key) => {
        return array.reduce((acc, item) => {
            const value = item[key];
            acc[value] = (acc[value] || 0) + 1;
            return acc;
        }, {});
    },
    
    countTags: (routes) => {
        const counts = {};
        routes.forEach(route => {
            route.tags.forEach(tag => {
                counts[tag] = (counts[tag] || 0) + 1;
            });
        });
        return counts;
    },
    
    lazyLoadImage: (img) => {
        img.classList.add('lazy-image');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.onload = () => img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: `${CONFIG.lazyLoadThreshold}px` });
        observer.observe(img);
    },
    
    showSections: (sections) => {
        const allSections = ['tagsSection', 'difficultySection', 'continentsSection', 'routesSection', 'routeDetail'];
        allSections.forEach(section => {
            const el = elements[section];
            if (el) {
                el.style.display = sections.includes(section) ? 'block' : 'none';
            }
        });
    }
};

// Data Management
const dataManager = {
    // 计算难度等级（基于距离和爬升）
    calculateDifficulty: (distance, elevation) => {
        // 综合评分：距离权重0.6，爬升权重0.4
        const score = (distance * 0.6) + (elevation / 100 * 0.4);
        
        if (score < 5) return { level: 1, name: '入门' };
        if (score < 7) return { level: 2, name: '初级' };
        if (score < 10) return { level: 3, name: '简单' };
        if (score < 12) return { level: 4, name: '较易' };
        if (score < 15) return { level: 5, name: '适中' };
        if (score < 18) return { level: 6, name: '中等' };
        if (score < 21) return { level: 7, name: '较难' };
        if (score < 25) return { level: 8, name: '困难' };
        if (score < 30) return { level: 9, name: '高难' };
        if (score < 35) return { level: 10, name: '专业' };
        if (score < 42) return { level: 11, name: '专家' };
        if (score < 50) return { level: 12, name: '极限' };
        if (score < 70) return { level: 13, name: '超极限' };
        return { level: 14, name: '极限挑战' };
    },
    
    loadRoutes: () => {
        try {
            console.log('Starting to load routes from JS data files...');
            
            // 从已加载的 JS 数据文件中收集所有路线
            const allDataFiles = [
                chinaData,
                japanData,
                singaporeData,
                uaeData,
                usaData,
                canadaData,
                ukData,
                franceData,
                switzerlandData,
                germanyData,
                italyData,
                australiaData,
                newzealandData,
                southAfricaData,
                tanzaniaData,
                brazilData,
                peruData,
                argentinaData
            ];
            
            const allRoutes = [];
            
            allDataFiles.forEach(data => {
                if (data && data.routes && Array.isArray(data.routes)) {
                    // 为每个路线添加 continent 和 country 信息
                    const routesWithMeta = data.routes.map(route => ({
                        ...route,
                        continent: data.continent,
                        continentEn: data.continentEn,
                        country: data.country,
                        countryEn: data.countryEn
                    }));
                    allRoutes.push(...routesWithMeta);
                }
            });
            
            console.log(`Loaded ${allRoutes.length} routes from JS data files`);
            
            // 重新计算所有路线的难度等级
            state.routes = allRoutes.map(route => {
                const newDifficulty = dataManager.calculateDifficulty(route.distance, route.elevation);
                return {
                    ...route,
                    difficulty: newDifficulty.level,
                    difficultyName: newDifficulty.name
                };
            });
            
            state.filteredRoutes = [...state.routes];
            return state.routes;
        } catch (error) {
            console.error('Error loading routes from JS data files:', error);
            state.routes = [];
            state.filteredRoutes = [];
            return [];
        }
    },
    
    getRouteById: (id) => {
        return state.routes.find(route => route.id === id);
    },
    
    filterRoutes: (filter) => {
        let filtered = [...state.routes];
        
        if (filter.type && filter.type !== 'all') {
            filtered = filtered.filter(route => route.type === filter.type);
        }
        
        if (filter.tag) {
            filtered = filtered.filter(route => route.tags.includes(filter.tag));
        }
        
        if (filter.difficulty) {
            filtered = filtered.filter(route => route.difficulty === filter.difficulty);
        }
        
        if (filter.continent) {
            filtered = filtered.filter(route => route.continent === filter.continent);
        }
        
        if (filter.country) {
            filtered = filtered.filter(route => route.country === filter.country);
        }
        
        if (filter.city) {
            filtered = filtered.filter(route => route.city === filter.city);
        }
        
        if (filter.search) {
            const query = filter.search.toLowerCase();
            filtered = filtered.filter(route => 
                route.name.toLowerCase().includes(query) ||
                route.nameEn.toLowerCase().includes(query) ||
                route.city.toLowerCase().includes(query) ||
                route.country.toLowerCase().includes(query) ||
                route.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }
        
        return utils.shuffle(filtered);
    },
    
    getAllTags: () => {
        return utils.countTags(state.routes);
    },
    
    getDifficultyCounts: () => {
        return utils.countBy(state.routes, 'difficulty');
    },
    
    getContinentCounts: () => {
        return utils.countBy(state.routes, 'continent');
    },
    
    getCountriesByContinent: (continent) => {
        const routes = state.routes.filter(r => r.continent === continent);
        return utils.getUnique(routes, 'country');
    },
    
    getCitiesByCountry: (country) => {
        const routes = state.routes.filter(r => r.country === country);
        return utils.getUnique(routes, 'city');
    },
    
    // 获取某国家下的所有省/地区
    getRegionsByCountry: (country) => {
        const routes = state.routes.filter(r => r.country === country);
        return utils.getUnique(routes, 'region');
    },
    
    // 获取某省/地区下的所有城市
    getCitiesByRegion: (country, region) => {
        const routes = state.routes.filter(r => r.country === country && r.region === region);
        return utils.getUnique(routes, 'city');
    }
};

// UI Rendering
const renderer = {
    renderHeroStats: () => {
        if (!elements.totalRoutes || !elements.totalCountries || !elements.totalContinents) {
            console.warn('Hero stats elements not found');
            return;
        }
        const totalRoutes = state.routes.length;
        const totalCountries = utils.getUnique(state.routes, 'country').length;
        const totalContinents = utils.getUnique(state.routes, 'continent').length;
        
        elements.totalRoutes.textContent = totalRoutes;
        elements.totalCountries.textContent = totalCountries;
        elements.totalContinents.textContent = totalContinents;
    },
    
    renderTagsCloud: () => {
        if (!elements.tagsCloud) {
            console.warn('Tags cloud element not found');
            return;
        }
        const tags = dataManager.getAllTags();
        // 随机排序标签
        const shuffledTags = utils.shuffle(Object.entries(tags));

        // 获取最大和最小数量，用于计算大小比例
        const counts = shuffledTags.map(([_, count]) => count);
        const maxCount = Math.max(...counts);
        const minCount = Math.min(...counts);

        elements.tagsCloud.innerHTML = shuffledTags.map(([tag, count]) => {
            const icon = CONFIG.tagIcons[tag] || '🏷️';
            const color = CONFIG.tagColors[tag] || '#64748b';

            // 根据数量计算大小等级 (1-5)
            let sizeClass = 'tag-size-1';
            if (maxCount > minCount) {
                const ratio = (count - minCount) / (maxCount - minCount);
                if (ratio >= 0.8) sizeClass = 'tag-size-5';
                else if (ratio >= 0.6) sizeClass = 'tag-size-4';
                else if (ratio >= 0.4) sizeClass = 'tag-size-3';
                else if (ratio >= 0.2) sizeClass = 'tag-size-2';
            } else if (count >= 5) {
                sizeClass = 'tag-size-5';
            }

            return `
                <button class="tag ${sizeClass}" data-tag="${tag}" style="--tag-color: ${color}">
                    <span class="tag-icon">${icon}</span>
                    <span class="tag-text">${tag}</span>
                    <span class="tag-count">${count}</span>
                </button>
            `;
        }).join('');

        elements.tagsCloud.querySelectorAll('.tag').forEach(btn => {
            btn.addEventListener('click', () => {
                const tag = btn.dataset.tag;
                navigation.showTagRoutes(tag);
            });
        });
    },
    
    renderDifficultyGrid: () => {
        if (!elements.difficultyGrid) {
            console.warn('Difficulty grid element not found');
            return;
        }
        const counts = dataManager.getDifficultyCounts();

        elements.difficultyGrid.innerHTML = CONFIG.difficultyLevels.map(level => {
            const count = counts[level.level] || 0;
            return `
                <div class="difficulty-card level-${level.level}" data-difficulty="${level.level}" style="--difficulty-color: ${level.color}">
                    <span class="difficulty-name" style="color: ${level.color}">${level.name}</span>
                    <span class="difficulty-range">${level.range}</span>
                    <span class="difficulty-count">${count} 条路线</span>
                </div>
            `;
        }).join('');

        elements.difficultyGrid.querySelectorAll('.difficulty-card').forEach(card => {
            card.addEventListener('click', () => {
                const difficulty = parseInt(card.dataset.difficulty);
                navigation.showDifficultyRoutes(difficulty);
            });
        });
    },
    
    renderContinentsGrid: () => {
        if (!elements.continentsGrid) {
            console.warn('Continents grid element not found');
            return;
        }
        const counts = dataManager.getContinentCounts();
        
        elements.continentsGrid.innerHTML = CONFIG.continents.map(continent => {
            const count = counts[continent.name] || 0;
            return `
                <div class="continent-card" data-continent="${continent.name}">
                    <img class="continent-image lazy-image" 
                         data-src="${continent.image}" 
                         alt="${continent.name}">
                    <div class="continent-overlay">
                        <span class="continent-name">${continent.name}</span>
                        <span class="continent-count">${count} 条路线</span>
                    </div>
                </div>
            `;
        }).join('');
        
        elements.continentsGrid.querySelectorAll('.lazy-image').forEach(img => {
            utils.lazyLoadImage(img);
        });
        
        elements.continentsGrid.querySelectorAll('.continent-card').forEach(card => {
            card.addEventListener('click', () => {
                const continent = card.dataset.continent;
                navigation.showCountriesPage(continent);
            });
        });
    },
    
    // 渲染国家列表
    renderCountriesGrid: (continent) => {
        const countries = dataManager.getCountriesByContinent(continent);
        const continentData = CONFIG.continents.find(c => c.name === continent);
        const totalRoutes = state.routes.filter(r => r.continent === continent).length;
        
        // 创建国家列表HTML
        const countriesHtml = countries.map(country => {
            const countryRoutes = state.routes.filter(r => r.country === country && r.continent === continent);
            const routeCount = countryRoutes.length;
            // 使用第一条路线的图片作为国家图片，或使用默认图片
            const countryImage = countryRoutes[0]?.image || continentData?.image || 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=400';
            
            return `
                <div class="continent-card country-card" data-country="${country}" data-continent="${continent}">
                    <img class="continent-image lazy-image" 
                         data-src="${countryImage}" 
                         alt="${country}">
                    <div class="continent-overlay">
                        <span class="continent-name">${country}</span>
                        <span class="continent-count">${routeCount} 条路线</span>
                    </div>
                </div>
            `;
        }).join('');
        
        // 渲染到 continentsGrid 中
        if (elements.continentsGrid) {
            elements.continentsGrid.innerHTML = `
                <div class="countries-header" style="grid-column: 1 / -1; margin-bottom: 1rem;">
                    <h2 style="font-size: 1.5rem; color: var(--text-primary);">${continent} - 选择国家</h2>
                    <button class="view-all-routes-btn" onclick="navigation.showContinentRoutes('${continent}'); return false;" 
                            style="margin-top: 0.5rem; padding: 0.5rem 1rem; background: var(--primary-color); color: white; border: none; border-radius: 0.5rem; cursor: pointer;">
                        查看 ${continent} 所有 ${totalRoutes} 条路线 →
                    </button>
                </div>
                ${countriesHtml}
            `;
            
            // 添加懒加载
            elements.continentsGrid.querySelectorAll('.lazy-image').forEach(img => {
                utils.lazyLoadImage(img);
            });
            
            // 添加点击事件 - 点击国家显示省/地区列表
            elements.continentsGrid.querySelectorAll('.country-card').forEach(card => {
                card.addEventListener('click', () => {
                    const country = card.dataset.country;
                    const cont = card.dataset.continent;
                    navigation.showRegionsPage(cont, country);
                });
            });
        }
    },
    
    renderRouteCard: (route) => {
        const difficultyColor = CONFIG.difficultyLevels[route.difficulty - 1]?.color || '#666';
        return `
            <article class="route-card" data-route-id="${route.id}">
                <div class="route-image-wrapper">
                    <img class="route-image lazy-image" 
                         data-src="${route.image}" 
                         alt="${route.name}">
                    <span class="route-difficulty-badge" style="background-color: ${difficultyColor}">
                        ${route.difficultyName}
                    </span>
                </div>
                <div class="route-content">
                    <h3 class="route-title">${route.name}</h3>
                    <div class="route-location">
                        <span>📍</span>
                        <span>${route.city}, ${route.country}</span>
                    </div>
                    <div class="route-stats">
                        <span class="route-stat">
                            <span>📏</span>
                            <span>${utils.formatDistance(route.distance)}</span>
                        </span>
                        <span class="route-stat">
                            <span>⛰️</span>
                            <span>${utils.formatElevation(route.elevation)}</span>
                        </span>
                    </div>
                    <div class="route-tags">
                        ${route.tags.slice(0, 3).map(tag => `
                            <span class="route-tag">${tag}</span>
                        `).join('')}
                    </div>
                </div>
            </article>
        `;
    },
    
    // 渲染省/地区列表
    renderRegionsGrid: (continent, country) => {
        const regions = dataManager.getRegionsByCountry(country);
        const countryRoutes = state.routes.filter(r => r.country === country);
        const countryImage = countryRoutes[0]?.image || 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=400';
        
        // 创建省/地区列表HTML
        const regionsHtml = regions.map(region => {
            const regionRoutes = state.routes.filter(r => r.country === country && r.region === region);
            const routeCount = regionRoutes.length;
            const regionImage = regionRoutes[0]?.image || countryImage;
            
            return `
                <div class="continent-card region-card" data-region="${region}" data-country="${country}" data-continent="${continent}">
                    <img class="continent-image lazy-image" 
                         data-src="${regionImage}" 
                         alt="${region}">
                    <div class="continent-overlay">
                        <span class="continent-name">${region}</span>
                        <span class="continent-count">${routeCount} 条路线</span>
                    </div>
                </div>
            `;
        }).join('');
        
        // 渲染到 continentsGrid 中
        if (elements.continentsGrid) {
            const totalRoutes = countryRoutes.length;
            elements.continentsGrid.innerHTML = `
                <div class="regions-header" style="grid-column: 1 / -1; margin-bottom: 1rem;">
                    <h2 style="font-size: 1.5rem; color: var(--text-primary);">${country} - 选择省/地区</h2>
                    <button class="view-all-routes-btn" onclick="navigation.showCountryRoutes('${continent}', '${country}'); return false;" 
                            style="margin-top: 0.5rem; padding: 0.5rem 1rem; background: var(--primary-color); color: white; border: none; border-radius: 0.5rem; cursor: pointer;">
                        查看 ${country} 所有 ${totalRoutes} 条路线 →
                    </button>
                </div>
                ${regionsHtml}
            `;
            
            // 添加懒加载
            elements.continentsGrid.querySelectorAll('.lazy-image').forEach(img => {
                utils.lazyLoadImage(img);
            });
            
            // 添加点击事件
            elements.continentsGrid.querySelectorAll('.region-card').forEach(card => {
                card.addEventListener('click', () => {
                    const region = card.dataset.region;
                    const cntry = card.dataset.country;
                    const cont = card.dataset.continent;
                    navigation.showCitiesPage(cont, cntry, region);
                });
            });
        }
    },
    
    // 渲染城市列表
    renderCitiesGrid: (continent, country, region) => {
        const cities = dataManager.getCitiesByRegion(country, region);
        const regionRoutes = state.routes.filter(r => r.country === country && r.region === region);
        const regionImage = regionRoutes[0]?.image || 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=400';
        
        // 创建城市列表HTML
        const citiesHtml = cities.map(city => {
            const cityRoutes = state.routes.filter(r => r.country === country && r.region === region && r.city === city);
            const routeCount = cityRoutes.length;
            const cityImage = cityRoutes[0]?.image || regionImage;
            
            return `
                <div class="continent-card city-card" data-city="${city}" data-region="${region}" data-country="${country}" data-continent="${continent}">
                    <img class="continent-image lazy-image" 
                         data-src="${cityImage}" 
                         alt="${city}">
                    <div class="continent-overlay">
                        <span class="continent-name">${city}</span>
                        <span class="continent-count">${routeCount} 条路线</span>
                    </div>
                </div>
            `;
        }).join('');
        
        // 渲染到 continentsGrid 中
        if (elements.continentsGrid) {
            const totalRoutes = regionRoutes.length;
            elements.continentsGrid.innerHTML = `
                <div class="cities-header" style="grid-column: 1 / -1; margin-bottom: 1rem;">
                    <h2 style="font-size: 1.5rem; color: var(--text-primary);">${region} - 选择城市</h2>
                    <button class="view-all-routes-btn" onclick="navigation.showRegionRoutes('${continent}', '${country}', '${region}'); return false;" 
                            style="margin-top: 0.5rem; padding: 0.5rem 1rem; background: var(--primary-color); color: white; border: none; border-radius: 0.5rem; cursor: pointer;">
                        查看 ${region} 所有 ${totalRoutes} 条路线 →
                    </button>
                </div>
                ${citiesHtml}
            `;
            
            // 添加懒加载
            elements.continentsGrid.querySelectorAll('.lazy-image').forEach(img => {
                utils.lazyLoadImage(img);
            });
            
            // 添加点击事件
            elements.continentsGrid.querySelectorAll('.city-card').forEach(card => {
                card.addEventListener('click', () => {
                    const city = card.dataset.city;
                    const rgn = card.dataset.region;
                    const cntry = card.dataset.country;
                    const cont = card.dataset.continent;
                    navigation.showCityRoutes(cont, cntry, rgn, city);
                });
            });
        }
    },
    
    renderRoutes: (routes, append = false) => {
        if (!elements.routesWaterfall) {
            console.warn('Routes waterfall element not found');
            return;
        }
        if (!append) {
            elements.routesWaterfall.innerHTML = '';
            state.loadOffset = 0;
        }
        
        const toRender = routes.slice(state.loadOffset, state.loadOffset + CONFIG.itemsPerLoad);
        
        if (toRender.length === 0 && !append) {
            elements.routesWaterfall.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🔍</div>
                    <h3 class="empty-state-title">没有找到路线</h3>
                    <p>尝试调整筛选条件</p>
                </div>
            `;
            return;
        }
        
        const html = toRender.map(route => renderer.renderRouteCard(route)).join('');
        
        if (append) {
            elements.routesWaterfall.insertAdjacentHTML('beforeend', html);
        } else {
            elements.routesWaterfall.innerHTML = html;
        }
        
        elements.routesWaterfall.querySelectorAll('.lazy-image').forEach(img => {
            utils.lazyLoadImage(img);
        });
        
        elements.routesWaterfall.querySelectorAll('.route-card').forEach(card => {
            card.addEventListener('click', () => {
                const routeId = card.dataset.routeId;
                navigation.showRouteDetail(routeId);
            });
        });
        
        state.loadOffset += toRender.length;
        state.displayedRoutes = append ? [...state.displayedRoutes, ...toRender] : toRender;
    },
    
    renderRouteDetail: (route) => {
        if (!elements.routeDetailContent) {
            console.warn('Route detail content element not found');
            return;
        }
        const difficulty = CONFIG.difficultyLevels[route.difficulty - 1];
        
        elements.routeDetailContent.innerHTML = `
            <div class="route-detail-header">
                <img class="route-detail-image" src="${route.image}" alt="${route.name}">
                <div class="route-detail-overlay">
                    <h1 class="route-detail-title">${route.name}</h1>
                    <div class="route-detail-location">
                        <span>📍</span>
                        <span>${route.city}, ${route.country} · ${route.continent}</span>
                    </div>
                </div>
            </div>
            
            <div class="route-detail-content">
                <div class="route-detail-stats">
                    <div class="detail-stat">
                        <span class="detail-stat-value">${utils.formatDistance(route.distance)}</span>
                        <span class="detail-stat-label">距离</span>
                    </div>
                    <div class="detail-stat">
                        <span class="detail-stat-value">${utils.formatElevation(route.elevation)}</span>
                        <span class="detail-stat-label">爬升</span>
                    </div>
                    <div class="detail-stat">
                        <span class="detail-stat-value" style="color: ${difficulty?.color || '#666'}">${route.difficultyName}</span>
                        <span class="detail-stat-label">难度</span>
                    </div>
                    <div class="detail-stat">
                        <span class="detail-stat-value">${route.surface}</span>
                        <span class="detail-stat-label">路面</span>
                    </div>
                </div>
                
                <h2 class="route-detail-section-title">路线介绍</h2>
                <p class="route-detail-description">${route.description}</p>
                
                <div class="route-detail-features">
                    <div class="feature-item">
                        <span class="feature-icon">✨</span>
                        <div class="feature-content">
                            <h4>最吸引人之处</h4>
                            <p>${route.highlights}</p>
                        </div>
                    </div>
                    <div class="feature-item">
                        <span class="feature-icon">🛤️</span>
                        <div class="feature-content">
                            <h4>路线特点</h4>
                            <p>${route.features}</p>
                        </div>
                    </div>
                    <div class="feature-item">
                        <span class="feature-icon">🕐</span>
                        <div class="feature-content">
                            <h4>最佳跑步时间</h4>
                            <p>${route.bestTime}</p>
                        </div>
                    </div>
                </div>
                
                <h2 class="route-detail-section-title">标签</h2>
                <div class="route-detail-tags">
                    ${route.tags.map(tag => `
                        <span class="route-detail-tag">${tag}</span>
                    `).join('')}
                </div>
            </div>
        `;
    },
    
    renderBreadcrumb: (items) => {
        if (!elements.breadcrumbList) {
            console.warn('Breadcrumb list element not found');
            return;
        }
        const html = items.map((item, index) => {
            const isLast = index === items.length - 1;
            if (isLast) {
                return `<li class="breadcrumb-item" aria-current="page">${item.label}</li>`;
            }
            return `<li class="breadcrumb-item"><a href="${item.href || '#'}" onclick="${item.onclick || ''}">${item.label}</a></li>`;
        }).join('');
        
        elements.breadcrumbList.innerHTML = html;
    },
    
    renderSearchResults: (routes) => {
        if (!elements.searchResults) {
            console.warn('Search results element not found');
            return;
        }
        if (routes.length === 0) {
            elements.searchResults.innerHTML = `
                <div class="empty-state" style="padding: 2rem;">
                    <p>没有找到匹配的结果</p>
                </div>
            `;
            return;
        }
        
        elements.searchResults.innerHTML = routes.slice(0, 6).map(route => `
            <div class="search-result-item" data-route-id="${route.id}">
                <img class="search-result-image" src="${route.image}" alt="${route.name}">
                <div class="search-result-info">
                    <div class="search-result-title">${route.name}</div>
                    <div class="search-result-meta">${route.city}, ${route.country} · ${utils.formatDistance(route.distance)}</div>
                </div>
            </div>
        `).join('');
        
        elements.searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const routeId = item.dataset.routeId;
                navigation.showRouteDetail(routeId);
                searchManager.close();
            });
        });
    }
};

// Navigation Management
const navigation = {
    showHome: () => {
        state.currentView = 'home';
        state.currentFilter = 'all';
        state.currentTag = null;
        state.currentDifficulty = null;
        state.currentContinent = null;
        state.currentCountry = null;
        state.currentCity = null;
        
        utils.showSections(['routesSection']);
        
        const shuffledRoutes = utils.shuffle(state.routes);
        renderer.renderRoutes(shuffledRoutes);

        if (elements.routesFilter) {
            elements.routesFilter.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.filter === 'all');
            });
        }
        
        renderer.renderBreadcrumb([{ label: '首页' }]);
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    showTagRoutes: (tag) => {
        state.currentView = 'tag';
        state.currentTag = tag;
        
        const filtered = dataManager.filterRoutes({ tag });
        
        utils.showSections(['routesSection']);
        
        renderer.renderRoutes(filtered);
        
        renderer.renderBreadcrumb([
            { label: '首页', onclick: 'navigation.showHome(); return false;' },
            { label: '标签', onclick: 'navigation.showTagsPage(); return false;' },
            { label: tag }
        ]);
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    showDifficultyRoutes: (difficulty) => {
        state.currentView = 'difficulty';
        state.currentDifficulty = difficulty;
        
        const level = CONFIG.difficultyLevels.find(l => l.level === difficulty);
        const filtered = dataManager.filterRoutes({ difficulty });
        
        utils.showSections(['routesSection']);
        
        renderer.renderRoutes(filtered);
        
        renderer.renderBreadcrumb([
            { label: '首页', onclick: 'navigation.showHome(); return false;' },
            { label: '难度', onclick: 'navigation.showDifficultyPage(); return false;' },
            { label: level?.name || difficulty }
        ]);
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    

    showRouteDetail: (routeId) => {
        const route = dataManager.getRouteById(routeId);
        if (!route) return;
        
        state.currentView = 'detail';
        state.currentRouteId = routeId;
        
        utils.showSections(['routeDetail']);
        
        renderer.renderRouteDetail(route);
        
        renderer.renderBreadcrumb([
            { label: '首页', onclick: 'navigation.showHome(); return false;' },
            { label: '大洲', onclick: 'navigation.showContinentsPage(); return false;' },
            { label: route.continent, onclick: `navigation.showCountriesPage('${route.continent}'); return false;` },
            { label: route.country, onclick: `navigation.showRegionsPage('${route.continent}', '${route.country}'); return false;` },
            { label: route.region, onclick: `navigation.showCitiesPage('${route.continent}', '${route.country}', '${route.region}'); return false;` },
            { label: route.city, onclick: `navigation.showCityRoutes('${route.continent}', '${route.country}', '${route.region}', '${route.city}'); return false;` },
            { label: route.name }
        ]);
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    // 显示所有大洲页面
    showContinentsPage: () => {
        state.currentView = 'continents-page';
        state.currentContinent = null;
        state.currentCountry = null;
        state.currentRegion = null;
        state.currentCity = null;

        utils.showSections(['continentsSection']);

        renderer.renderContinentsGrid();

        renderer.renderBreadcrumb([
            { label: '首页', onclick: 'navigation.showHome(); return false;' },
            { label: '大洲' }
        ]);

        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    // 显示所有标签页面
    showTagsPage: () => {
        state.currentView = 'tags-page';

        utils.showSections(['tagsSection']);

        renderer.renderTagsCloud();

        renderer.renderBreadcrumb([
            { label: '首页', onclick: 'navigation.showHome(); return false;' },
            { label: '标签' }
        ]);

        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    // 显示所有难度页面
    showDifficultyPage: () => {
        state.currentView = 'difficulty-page';

        utils.showSections(['difficultySection']);

        renderer.renderDifficultyGrid();

        renderer.renderBreadcrumb([
            { label: '首页', onclick: 'navigation.showHome(); return false;' },
            { label: '难度' }
        ]);

        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    // 显示国家列表页面（点击大洲后）
    showCountriesPage: (continent) => {
        state.currentView = 'countries-page';
        state.currentContinent = continent;
        
        utils.showSections(['continentsSection']);
        
        renderer.renderCountriesGrid(continent);
        
        renderer.renderBreadcrumb([
            { label: '首页', onclick: 'navigation.showHome(); return false;' },
            { label: '大洲', onclick: 'navigation.showContinentsPage(); return false;' },
            { label: continent }
        ]);
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    // 显示省/地区列表页面（点击国家后）
    showRegionsPage: (continent, country) => {
        state.currentView = 'regions-page';
        state.currentContinent = continent;
        state.currentCountry = country;
        
        utils.showSections(['continentsSection']);
        
        renderer.renderRegionsGrid(continent, country);
        
        renderer.renderBreadcrumb([
            { label: '首页', onclick: 'navigation.showHome(); return false;' },
            { label: '大洲', onclick: 'navigation.showContinentsPage(); return false;' },
            { label: continent, onclick: `navigation.showCountriesPage('${continent}'); return false;` },
            { label: country }
        ]);
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    // 显示某个国家的路线列表（汇总）
    showCountryRoutes: (continent, country) => {
        state.currentView = 'country';
        state.currentContinent = continent;
        state.currentCountry = country;
        
        const filtered = dataManager.filterRoutes({ continent, country });
        
        utils.showSections(['routesSection']);
        
        renderer.renderRoutes(filtered);

        renderer.renderBreadcrumb([
            { label: '首页', onclick: 'navigation.showHome(); return false;' },
            { label: '大洲', onclick: 'navigation.showContinentsPage(); return false;' },
            { label: continent, onclick: `navigation.showCountriesPage('${continent}'); return false;` },
            { label: country }
        ]);
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    // 显示城市列表页面（点击省/地区后）
    showCitiesPage: (continent, country, region) => {
        state.currentView = 'cities-page';
        state.currentContinent = continent;
        state.currentCountry = country;
        state.currentRegion = region;
        
        utils.showSections(['continentsSection']);
        
        renderer.renderCitiesGrid(continent, country, region);
        
        renderer.renderBreadcrumb([
            { label: '首页', onclick: 'navigation.showHome(); return false;' },
            { label: '大洲', onclick: 'navigation.showContinentsPage(); return false;' },
            { label: continent, onclick: `navigation.showCountriesPage('${continent}'); return false;` },
            { label: country, onclick: `navigation.showRegionsPage('${continent}', '${country}'); return false;` },
            { label: region }
        ]);
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    // 显示某个省/地区的路线列表（汇总）
    showRegionRoutes: (continent, country, region) => {
        state.currentView = 'region';
        state.currentContinent = continent;
        state.currentCountry = country;
        state.currentRegion = region;
        
        const filtered = state.routes.filter(r => r.continent === continent && r.country === country && r.region === region);
        
        utils.showSections(['routesSection']);
        
        renderer.renderRoutes(filtered);

        renderer.renderBreadcrumb([
            { label: '首页', onclick: 'navigation.showHome(); return false;' },
            { label: '大洲', onclick: 'navigation.showContinentsPage(); return false;' },
            { label: continent, onclick: `navigation.showCountriesPage('${continent}'); return false;` },
            { label: country, onclick: `navigation.showRegionsPage('${continent}', '${country}'); return false;` },
            { label: region }
        ]);
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    // 显示某个城市的路线列表
    showCityRoutes: (continent, country, region, city) => {
        state.currentView = 'city';
        state.currentContinent = continent;
        state.currentCountry = country;
        state.currentRegion = region;
        state.currentCity = city;
        
        const filtered = state.routes.filter(r => 
            r.continent === continent && 
            r.country === country && 
            r.region === region && 
            r.city === city
        );
        
        utils.showSections(['routesSection']);
        
        renderer.renderRoutes(filtered);

        renderer.renderBreadcrumb([
            { label: '首页', onclick: 'navigation.showHome(); return false;' },
            { label: '大洲', onclick: 'navigation.showContinentsPage(); return false;' },
            { label: continent, onclick: `navigation.showCountriesPage('${continent}'); return false;` },
            { label: country, onclick: `navigation.showRegionsPage('${continent}', '${country}'); return false;` },
            { label: region, onclick: `navigation.showCitiesPage('${continent}', '${country}', '${region}'); return false;` },
            { label: city }
        ]);
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    // 修改原来的 showContinentRoutes，现在用于从国家页面返回时显示该大洲的所有路线
    showContinentRoutes: (continent) => {
        state.currentView = 'continent';
        state.currentContinent = continent;
        state.currentCountry = null;
        
        const filtered = dataManager.filterRoutes({ continent });
        
        utils.showSections(['routesSection']);
        
        renderer.renderRoutes(filtered);

        renderer.renderBreadcrumb([
            { label: '首页', onclick: 'navigation.showHome(); return false;' },
            { label: '大洲', onclick: 'navigation.showContinentsPage(); return false;' },
            { label: continent }
        ]);
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

// Search Management
const searchManager = {
    open: () => {
        if (elements.searchOverlay) {
            elements.searchOverlay.classList.add('active');
            if (elements.searchInput) elements.searchInput.focus();
            document.body.style.overflow = 'hidden';
        }
    },
    
    close: () => {
        if (elements.searchOverlay) {
            elements.searchOverlay.classList.remove('active');
            if (elements.searchInput) elements.searchInput.value = '';
            if (elements.searchResults) elements.searchResults.innerHTML = '';
            document.body.style.overflow = '';
        }
    },
    
    search: utils.debounce((query) => {
        if (!query.trim()) {
            if (elements.searchResults) elements.searchResults.innerHTML = '';
            return;
        }
        
        const results = dataManager.filterRoutes({ search: query });
        renderer.renderSearchResults(results);
    }, 300)
};

// Theme Management
const themeManager = {
    init: () => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.setAttribute('data-theme', 'dark');
            if (elements.themeToggle) {
                const icon = elements.themeToggle.querySelector('.theme-icon');
                if (icon) icon.textContent = '☀️';
            }
        }
    },
    
    toggle: () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            if (elements.themeToggle) {
                const icon = elements.themeToggle.querySelector('.theme-icon');
                if (icon) icon.textContent = '🌙';
            }
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            if (elements.themeToggle) {
                const icon = elements.themeToggle.querySelector('.theme-icon');
                if (icon) icon.textContent = '☀️';
            }
        }
    }
};

// Event Handlers
const initEventHandlers = () => {
    // Navigation toggle
    if (elements.navToggle && elements.navMenu) {
        elements.navToggle.addEventListener('click', () => {
            elements.navToggle.classList.toggle('active');
            elements.navMenu.classList.toggle('active');
        });
        
        elements.navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                elements.navToggle.classList.remove('active');
                elements.navMenu.classList.remove('active');
            });
        });
    }
    
    // Theme toggle
    if (elements.themeToggle) {
        elements.themeToggle.addEventListener('click', themeManager.toggle);
    }
    
    // Search
    if (elements.searchToggle && elements.searchClose && elements.searchInput && elements.searchOverlay) {
        elements.searchToggle.addEventListener('click', searchManager.open);
        elements.searchClose.addEventListener('click', searchManager.close);
        
        elements.searchInput.addEventListener('input', (e) => {
            searchManager.search(e.target.value);
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && elements.searchOverlay.classList.contains('active')) {
                searchManager.close();
            }
        });
    }
    
    // Filter buttons
    if (elements.routesFilter) {
        elements.routesFilter.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                elements.routesFilter.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                state.currentFilter = filter;
                
                let filtered;
                if (state.currentView === 'home') {
                    filtered = dataManager.filterRoutes({ type: filter });
                } else {
                    const baseFiltered = dataManager.filterRoutes({
                        tag: state.currentTag,
                        difficulty: state.currentDifficulty,
                        continent: state.currentContinent,
                        type: filter !== 'all' ? filter : undefined
                    });
                    filtered = baseFiltered;
                }
                
                renderer.renderRoutes(filtered);
            });
        });
    }
    
    // Infinite scroll observer
    if (elements.loadingIndicator) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !state.isLoading) {
                    if (state.loadOffset < state.filteredRoutes.length) {
                        state.isLoading = true;
                        elements.loadingIndicator.classList.add('active');
                        
                        setTimeout(() => {
                            renderer.renderRoutes(state.filteredRoutes, true);
                            state.isLoading = false;
                            elements.loadingIndicator.classList.remove('active');
                        }, 500);
                    }
                }
            });
        }, { rootMargin: '100px' });
        
        observer.observe(elements.loadingIndicator);
    }
};

// Initialize Application
const init = () => {
    try {
        console.log('Initializing app...');

        themeManager.init();

        // Load data from JS files
        dataManager.loadRoutes();
        console.log('Routes loaded:', state.routes.length);

        // Render all sections
        renderer.renderHeroStats();
        console.log('Hero stats rendered');

        renderer.renderTagsCloud();
        console.log('Tags cloud rendered');

        renderer.renderDifficultyGrid();
        console.log('Difficulty grid rendered');

        renderer.renderContinentsGrid();
        console.log('Continents grid rendered');

        renderer.renderRoutes(state.routes);
        console.log('Routes rendered');

        initEventHandlers();
        console.log('Event handlers initialized');

        // Handle URL hash
        const hash = window.location.hash.slice(1);
        if (hash.startsWith('route-')) {
            navigation.showRouteDetail(hash);
        } else {
            // 默认显示首页（只显示精选路线）
            navigation.showHome();
        }

        console.log('App initialized successfully!');
    } catch (error) {
        console.error('Error initializing app:', error);
    }
};

// Start the application
document.addEventListener('DOMContentLoaded', init);

// Expose navigation functions globally
window.navigation = navigation;
