(() => {
  'use strict';

  const app = document.getElementById('app');
  const storageKey = 'elp496-identity-web-profiles-v2';

  const instructors = ['Amy S.', 'Derek W.', 'Frank T.', 'Kate B.', 'Katie L.', 'Maria M.', 'Peter S.', 'Ryan S.', 'Vicki H.'];
  const communities = [
    ['CLE', 'Clement Hall'],
    ['EVA', 'Evans Quad'],
    ['FAR', 'Fargo Quad'],
    ['FLEEK', 'Flickinger Court and Creekside Village'],
    ['FNT', 'Flint Village'],
    ['GOO', 'Goodyear Hall'],
    ['GOV', 'Governors Complex'],
    ['GRE', 'Greiner Hall'],
    ['HAD', 'Hadley Village'],
    ['RED', 'Red Jacket Quad'],
    ['RIC', 'Richmond Quad'],
    ['SLV', 'South Lake Village'],
    ['SPA', 'Spaulding Quad'],
    ['WIL', 'Wilkeson Quad']
  ];

  const categories = [
    { id: 'race', label: 'Race', options: ['Asian', 'Black or African American', 'Indigenous or Native', 'Middle Eastern or North African', 'Multiracial', 'Native Hawaiian or Pacific Islander', 'White'] },
    { id: 'ethnicity', label: 'Ethnicity, Culture, Ancestry, or Heritage', options: ['African American', 'Arab', 'Caribbean', 'Chinese', 'Filipino', 'Ghanaian', 'Haitian', 'Indian', 'Irish', 'Italian', 'Korean', 'Latina/o/e/x', 'Mexican', 'Nigerian', 'Polish', 'Puerto Rican', 'South Asian'] },
    { id: 'nationality', label: 'Nationality or Migration Experience', options: ['Dual national', 'Immigrant', 'International student', 'Refugee', 'Second-generation immigrant', 'U.S.-born', 'U.S. citizen'] },
    { id: 'gender', label: 'Gender Identity or Expression', options: ['Agender', 'Cisgender', 'Genderfluid', 'Man', 'Nonbinary', 'Transgender', 'Two-Spirit', 'Woman'] },
    { id: 'orientation', label: 'Sexual or Romantic Orientation', options: ['Aromantic', 'Asexual', 'Bisexual', 'Gay', 'Lesbian', 'Pansexual', 'Queer', 'Questioning', 'Straight'] },
    { id: 'age', label: 'Age or Generation', options: ['Adult learner', 'Generation Z', 'Older student', 'Traditional-age college student', 'Young adult'] },
    { id: 'ability', label: 'Ability, Disability, and Neurodivergence', options: ['ADHD', 'Autistic', 'Chronically ill', 'Disabled', 'Learning disability', 'Mental health-related disability', 'Mobility disability', 'Neurodivergent', 'Neurotypical', 'Non-disabled', 'Sensory disability'] },
    { id: 'religion', label: 'Religion, Spirituality, or Worldview', options: ['Agnostic', 'Atheist', 'Buddhist', 'Christian', 'Hindu', 'Jewish', 'Muslim', 'Secular humanist', 'Sikh', 'Spiritual but not religious'] },
    { id: 'class', label: 'Social Class and Economic Background', options: ['Low-income background', 'Middle-class background', 'Upper-middle-class background', 'Wealthy or affluent background', 'Working-class background'] },
    { id: 'education', label: 'Education and College Experience', options: ['Continuing-generation college student', 'First-generation college student', 'Graduate student', 'Returning student', 'Transfer student', 'Undergraduate student'] },
    { id: 'language', label: 'Language', options: ['American Sign Language user', 'Bilingual', 'English as an additional language', 'English as a first language', 'Multilingual'] },
    { id: 'body', label: 'Body, Appearance, and Expression', options: ['Body size or shape', 'Hair or cultural expression', 'Height', 'Religious or cultural dress', 'Style or presentation', 'Visible difference, birthmark, or scarring'] },
    { id: 'roles', label: 'Roles, Relationships, or Affiliations', options: ['Artist', 'Athlete', 'Caregiver', 'Community Assistant', 'Employee', 'Fraternity or sorority member', 'Gamer', 'Parent', 'Partner', 'Sibling', 'Student leader', 'Veteran'] }
  ];

  const values = ['Achievement', 'Authenticity', 'Belonging', 'Care and compassion', 'Community', 'Creativity', 'Curiosity', 'Equity and fairness', 'Family', 'Faith and spirituality', 'Freedom and independence', 'Growth', 'Honesty', 'Justice', 'Knowledge and learning', 'Loyalty', 'Responsibility', 'Safety and security', 'Service', 'Tradition'];
  const priorities = ['Academic progress', 'Advocacy and equity', 'Career development', 'Community and belonging', 'Cultural connection', 'Family responsibilities', 'Financial stability', 'Health and wellness', 'Identity expression', 'Personal growth', 'Relationships', 'Safety and stability', 'Service and leadership', 'Spiritual and faith life'];
  const roles = ['Family', 'Friendships', 'Partner or dating relationships', 'Residents', 'CA team', 'Supervisor or professional team', 'Classroom or academic community', 'Workplace', 'Faith or spiritual community', 'Cultural or identity community', 'Student organization, club, or team', 'Wider community or public spaces'];
  const accessOptions = ['Greater access or advantage', 'Barriers or marginalization', 'Both access and barriers', 'Different effects in different settings', 'Little or no noticeable effect', 'Unsure or still exploring'];

  // Compact labels are used only inside the ring diagram. Full identity names
  // remain everywhere else, including screen-reader labels and detail views.
  const ringLabelAliases = {
    'Black or African American': 'Black/African Am.',
    'Chinese American': 'Chinese Am.',
    'Indigenous or Native': 'Indigenous/Native',
    'Middle Eastern or North African': 'MENA',
    'Native Hawaiian or Pacific Islander': 'Native Haw./PI',
    'International student': 'Intl. student',
    'Second-generation immigrant': '2nd-gen immigrant',
    'Traditional-age college student': 'Traditional age',
    'Learning disability': 'Learning disab.',
    'Mental health-related disability': 'Mental health',
    'Mobility disability': 'Mobility disab.',
    'Neurodivergent': 'Neurodiv.',
    'Neurotypical': 'Neurotyp.',
    'Spiritual but not religious': 'Spiritual—not rel.',
    'Low-income background': 'Low-income',
    'Middle-class background': 'Middle-class',
    'Upper-middle-class background': 'Upper-mid class',
    'Wealthy or affluent background': 'Affluent',
    'Working-class background': 'Working-class',
    'Continuing-generation college student': 'Continuing Gen',
    'First-generation college student': 'First Gen',
    'Undergraduate student': 'Undergrad',
    'American Sign Language user': 'ASL user',
    'English as an additional language': 'English (add’l)',
    'English as a first language': 'English (first)',
    'Multilingual': 'Multi-lang.',
    'Hair or cultural expression': 'Hair/culture',
    'Religious or cultural dress': 'Cultural dress',
    'Style or presentation': 'Style/present.',
    'Visible difference, birthmark, or scarring': 'Visible difference',
    'Community Assistant': 'CA',
    'Fraternity or sorority member': 'Frat./sorority'
  };

  const placements = {
    visible: 'Often visible or read by others',
    hidden: 'Not readily visible'
  };

  function deep(valuesList, priority, roleList, access) {
    return { values: valuesList, priority, roles: roleList, access };
  }

  function ident(category, label, placement, salience, deeper = null) {
    return { id: `${category}-${slug(label)}`, category, label, placement, salience, deeper };
  }

  const seedProfiles = [
    {
      firstName: 'Maya', lastName: 'Chen', email: 'maya.chen@buffalo.edu', instructor: 'Maria M.', community: 'GRE',
      identities: [
        ident('religion', 'Buddhist', 'hidden', 3, deep(['Care and compassion', 'Community'], 'Spiritual and faith life', ['Faith or spiritual community', 'Wider community or public spaces'], 'Different effects in different settings')),
        ident('education', 'First-generation college student', 'hidden', 3, deep(['Growth', 'Family'], 'Academic progress', ['Family', 'Classroom or academic community'], 'Both access and barriers')),
        ident('gender', 'Woman', 'visible', 2),
        ident('ethnicity', 'Chinese American', 'visible', 3),
        ident('language', 'Multilingual', 'hidden', 2),
        ident('class', 'Middle-class background', 'hidden', 1),
        ident('race', 'Asian', 'visible', 2),
        ident('roles', 'Community Assistant', 'visible', 3)
      ],
      deepenedIds: ['religion-buddhist', 'education-first-generation-college-student']
    },
    {
      firstName: 'Noah', lastName: 'Martin', email: 'noah.martin@buffalo.edu', instructor: 'Ryan S.', community: 'GOV',
      identities: [
        ident('religion', 'Buddhist', 'hidden', 2, deep(['Care and compassion', 'Community'], 'Spiritual and faith life', ['Faith or spiritual community', 'Wider community or public spaces'], 'Little or no noticeable effect')),
        ident('education', 'Continuing-generation college student', 'hidden', 2, deep(['Knowledge and learning', 'Freedom and independence'], 'Career development', ['Classroom or academic community', 'Family'], 'Greater access or advantage')),
        ident('gender', 'Man', 'visible', 2),
        ident('race', 'White', 'visible', 2),
        ident('ability', 'ADHD', 'hidden', 3),
        ident('roles', 'Gamer', 'hidden', 1),
        ident('age', 'Generation Z', 'visible', 2),
        ident('body', 'Height', 'visible', 1)
      ],
      deepenedIds: ['religion-buddhist', 'education-continuing-generation-college-student']
    },
    {
      firstName: 'Priya', lastName: 'Shah', email: 'priya.shah@buffalo.edu', instructor: 'Maria M.', community: 'GRE',
      identities: [
        ident('religion', 'Hindu', 'hidden', 3, deep(['Faith and spirituality', 'Family'], 'Spiritual and faith life', ['Faith or spiritual community', 'Family'], 'Different effects in different settings')),
        ident('education', 'First-generation college student', 'hidden', 3, deep(['Growth', 'Family'], 'Academic progress', ['Family', 'Classroom or academic community'], 'Barriers or marginalization')),
        ident('gender', 'Woman', 'visible', 3),
        ident('ethnicity', 'Indian', 'visible', 3),
        ident('language', 'Multilingual', 'hidden', 2),
        ident('nationality', 'International student', 'hidden', 3),
        ident('race', 'Asian', 'visible', 2),
        ident('body', 'Religious or cultural dress', 'visible', 3)
      ],
      deepenedIds: ['religion-hindu', 'education-first-generation-college-student']
    },
    {
      firstName: 'Jordan', lastName: 'Brooks', email: 'jordan.brooks@buffalo.edu', instructor: 'Peter S.', community: 'RED',
      identities: [
        ident('religion', 'Christian', 'hidden', 2, deep(['Community', 'Service'], 'Service and leadership', ['Faith or spiritual community', 'Residents'], 'Greater access or advantage')),
        ident('education', 'First-generation college student', 'hidden', 3, deep(['Growth', 'Family'], 'Financial stability', ['Family', 'Classroom or academic community'], 'Barriers or marginalization')),
        ident('race', 'Black or African American', 'visible', 3),
        ident('gender', 'Man', 'visible', 2),
        ident('class', 'Working-class background', 'hidden', 3),
        ident('roles', 'Athlete', 'visible', 2),
        ident('age', 'Generation Z', 'visible', 2),
        ident('orientation', 'Straight', 'hidden', 1)
      ],
      deepenedIds: ['religion-christian', 'education-first-generation-college-student']
    },
    {
      firstName: 'Eli', lastName: 'Torres', email: 'eli.torres@buffalo.edu', instructor: 'Vicki H.', community: 'GOO',
      identities: [
        ident('religion', 'Agnostic', 'hidden', 1, deep(['Authenticity', 'Freedom and independence'], 'Personal growth', ['Friendships', 'Wider community or public spaces'], 'Little or no noticeable effect')),
        ident('education', 'First-generation college student', 'hidden', 3, deep(['Achievement', 'Family'], 'Academic progress', ['Family', 'Classroom or academic community'], 'Barriers or marginalization')),
        ident('ethnicity', 'Puerto Rican', 'visible', 3),
        ident('gender', 'Nonbinary', 'visible', 3),
        ident('orientation', 'Queer', 'hidden', 3),
        ident('language', 'Bilingual', 'hidden', 2),
        ident('roles', 'Community Assistant', 'visible', 3),
        ident('body', 'Style or presentation', 'visible', 2)
      ],
      deepenedIds: ['religion-agnostic', 'education-first-generation-college-student']
    },
    {
      firstName: 'Sam', lastName: 'Rivera', email: 'sam.rivera@buffalo.edu', instructor: 'Amy S.', community: 'FNT',
      identities: [
        ident('religion', 'Spiritual but not religious', 'hidden', 2, deep(['Authenticity', 'Care and compassion'], 'Personal growth', ['Friendships', 'Cultural or identity community'], 'Different effects in different settings')),
        ident('education', 'Transfer student', 'hidden', 2, deep(['Growth', 'Knowledge and learning'], 'Academic progress', ['Classroom or academic community', 'CA team'], 'Both access and barriers')),
        ident('ethnicity', 'Latina/o/e/x', 'visible', 3),
        ident('gender', 'Woman', 'visible', 2),
        ident('orientation', 'Bisexual', 'hidden', 2),
        ident('roles', 'Caregiver', 'hidden', 3),
        ident('race', 'Multiracial', 'visible', 2),
        ident('body', 'Style or presentation', 'visible', 2)
      ],
      deepenedIds: ['religion-spiritual-but-not-religious', 'education-transfer-student']
    }
  ];

  const state = {
    view: 'welcome',
    currentEmail: '',
    draft: null,
    selectedIds: [],
    identitySearch: '',
    categoryFilter: 'all',
    deepIndex: 0,
    filter: 'all',
    matchMode: 'both',
    placementMode: 'all',
    networkView: 'local',
    selectedIdentityId: null,
    selectedOwnerEmail: null,
    selectedPeerEmail: null,
    graphFocusEmail: '',
    graphIdentityFocus: null,
    graph: { scale: 1, x: 0, y: 0 },
    graphPointers: new Map(),
    graphMoved: false
  };

  function slug(text) {
    return String(text).toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function esc(value) {
    return String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
  }

  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function categoryLabel(id) { return categories.find(category => category.id === id)?.label || id; }
  function communityLabel(code) { return communities.find(item => item[0] === code)?.[1] || code; }
  function initials(profile) { return `${profile.firstName?.[0] || ''}${profile.lastName?.[0] || ''}`.toUpperCase(); }
  function normalizeEmail(email) { return String(email || '').trim().toLowerCase(); }
  function dots(value) { return `${'●'.repeat(value)}${'○'.repeat(3 - value)}`; }
  function currentProfile() { return allProfiles().find(profile => normalizeEmail(profile.email) === normalizeEmail(state.currentEmail)) || state.draft; }

  function localProfiles() {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || '[]').map(profile => ({
        ...profile,
        identities: (profile.identities || []).map(identity => ({ ...identity, placement: identity.placement === 'context' ? 'hidden' : identity.placement }))
      }));
    }
    catch { return []; }
  }

  function allProfiles() {
    const map = new Map(seedProfiles.map(profile => [normalizeEmail(profile.email), clone(profile)]));
    localProfiles().forEach(profile => map.set(normalizeEmail(profile.email), profile));
    return [...map.values()];
  }

  function saveProfile(profile) {
    const saved = localProfiles();
    const email = normalizeEmail(profile.email);
    const next = saved.filter(item => normalizeEmail(item.email) !== email);
    next.push(clone(profile));
    localStorage.setItem(storageKey, JSON.stringify(next));
    state.currentEmail = email;
  }

  function identityCatalog() {
    return categories.flatMap(category => category.options.map(label => ({ id: `${category.id}-${slug(label)}`, category: category.id, label })));
  }

  function shell(content, options = {}) {
    const signedIn = Boolean(currentProfile() && ['web', 'identity', 'identity-home', 'compare', 'ring'].includes(state.view));
    return `
      <div class="app-shell">
        <header class="app-header">
          <button class="brand" type="button" data-action="home" aria-label="Identity Web home">
            <span class="brand-mark" aria-hidden="true"></span>
            <span class="brand-text"><strong>Identity Web</strong><span>ELP 496</span></span>
          </button>
          ${signedIn ? `<button class="header-action" type="button" data-action="switch-profile">Switch profile</button>` : ''}
        </header>
        <main class="main ${options.narrow ? 'narrow' : ''}">${content}</main>
        ${options.tabs ? tabs(options.activeTab) : ''}
      </div>`;
  }

  function tabs(active) {
    return `<nav class="app-tabs" aria-label="Main views">
      <button class="app-tab ${active === 'web' ? 'active' : ''}" type="button" data-view="web">My Web</button>
      <button class="app-tab ${active === 'explore' ? 'active' : ''}" type="button" data-view="identity-home">Explore</button>
      <button class="app-tab ${active === 'ring' ? 'active' : ''}" type="button" data-view="ring">My Ring</button>
    </nav>`;
  }

  function progress(step, total, label) {
    const percent = Math.round((step / total) * 100);
    return `<div class="progress-wrap">
      <div class="progress-meta"><span>${esc(label)}</span><span>Step ${step} of ${total}</span></div>
      <div class="progress-track" role="progressbar" aria-label="Assessment progress" aria-valuemin="1" aria-valuemax="${total}" aria-valuenow="${step}"><div class="progress-fill" style="width:${percent}%"></div></div>
    </div>`;
  }

  function render(scroll = true) {
    const views = {
      welcome: renderWelcome,
      profile: renderProfile,
      identities: renderIdentitySelection,
      mapping: renderMapping,
      'choose-deep': renderChooseDeep,
      deepen: renderDeepen,
      review: renderReview,
      web: renderWeb,
      identity: renderIdentityConnections,
      'identity-home': renderIdentityHome,
      compare: renderCompare,
      ring: renderRing
    };
    const renderer = views[state.view] || renderWelcome;
    app.innerHTML = renderer();
    if (scroll) window.scrollTo({ top: 0, behavior: 'auto' });
    if (state.view === 'web') requestAnimationFrame(setGraphTransform);
  }

  function renderWelcome() {
    return shell(`<section class="welcome">
      <div class="welcome-copy">
        <p class="eyebrow">ELP 496 · Identities and values</p>
        <h1>See yourself. Find the connections.</h1>
        <p>Build your identity ring, then explore where your experiences connect with CAs across Campus Living.</p>
        <div class="orbit-preview" aria-hidden="true">
          <span class="orbit one"></span><span class="orbit two"></span><span class="person-dot">You</span>
          <span class="identity-dot"></span><span class="identity-dot"></span><span class="identity-dot"></span><span class="identity-dot"></span>
        </div>
      </div>
      <div class="panel panel-body">
        <form class="stack" data-form="lookup" novalidate>
          <div>
            <h2>Begin or return</h2>
            <p class="muted">Use your UB email to create your identity web or reopen it later.</p>
          </div>
          <label class="field">
            <span>UB email</span>
            <input type="email" name="email" autocomplete="email" placeholder="name@buffalo.edu" required>
          </label>
          <div class="error" id="lookup-error" role="alert"></div>
          <button class="btn btn-primary btn-block" type="submit">Continue</button>
          <button class="btn btn-quiet btn-block" type="button" data-action="demo">Open sample profile</button>
          <p class="small muted">Prototype note: sample profiles are fictional. New profiles are saved on this device.</p>
        </form>
      </div>
    </section>`);
  }

  function renderProfile() {
    const draft = state.draft || {};
    const instructorOptions = instructors.map(name => `<option value="${esc(name)}" ${draft.instructor === name ? 'selected' : ''}>${esc(name)}</option>`).join('');
    const communityOptions = communities.map(([code, label]) => `<option value="${code}" ${draft.community === code ? 'selected' : ''}>${esc(label)} (${code})</option>`).join('');
    return shell(`${progress(1, 7, 'About you')}
      <section class="screen-heading">
        <p class="eyebrow">Start your identity ring</p>
        <h1>About you</h1>
        <p>This information helps you find CAs in your class, building, and across the department.</p>
      </section>
      <div class="panel panel-body">
        <form class="stack" data-form="profile" novalidate>
          <div class="grid-2">
            <label class="field"><span>First name</span><input name="firstName" type="text" autocomplete="given-name" value="${esc(draft.firstName || '')}" required></label>
            <label class="field"><span>Last name</span><input name="lastName" type="text" autocomplete="family-name" value="${esc(draft.lastName || '')}" required></label>
          </div>
          <label class="field"><span>UB email</span><input name="email" type="email" autocomplete="email" value="${esc(draft.email || state.currentEmail)}" required></label>
          <label class="field"><span>Instructor</span><select name="instructor" required><option value="">Choose your instructor</option>${instructorOptions}</select></label>
          <label class="field"><span>Building or community</span><select name="community" required><option value="">Choose your community</option>${communityOptions}</select></label>
          <div class="error" id="profile-error" role="alert"></div>
          <div class="button-row split"><button class="btn" type="button" data-action="cancel-profile">Back</button><button class="btn btn-primary" type="submit">Choose identities</button></div>
        </form>
      </div>`, { narrow: true });
  }

  function renderIdentitySelection() {
    const catalog = identityCatalog();
    const query = state.identitySearch.trim().toLowerCase();
    const selectedMap = new Map((state.draft.identities || []).map(item => [item.id, item]));
    const visibleCategories = categories.filter(category => state.categoryFilter === 'all' || category.id === state.categoryFilter);
    const groups = visibleCategories.map(category => {
      const options = catalog.filter(item => item.category === category.id && (!query || `${item.label} ${category.label}`.toLowerCase().includes(query)));
      if (!options.length) return '';
      return `<section class="identity-group"><h3>${esc(category.label)} <span>${options.length} options</span></h3><div class="identity-options">
        ${options.map(item => `<button class="identity-option" type="button" data-action="toggle-identity" data-id="${item.id}" data-category="${item.category}" data-label="${esc(item.label)}" aria-pressed="${selectedMap.has(item.id)}">${esc(item.label)}</button>`).join('')}
      </div></section>`;
    }).join('');
    const selected = (state.draft.identities || []).map(item => `<button class="chip selected" type="button" data-action="remove-identity" data-id="${item.id}">${esc(item.label)} <span class="x" aria-hidden="true">×</span></button>`).join('');
    const categoryOptions = categories.map(category => `<option value="${category.id}" ${state.categoryFilter === category.id ? 'selected' : ''}>${esc(category.label)}</option>`).join('');
    const customCategories = categories.map(category => `<option value="${category.id}">${esc(category.label)}</option>`).join('');
    const count = state.draft.identities?.length || 0;
    return shell(`${progress(2, 7, 'Choose eight identities')}
      <section class="screen-heading">
        <p class="eyebrow">${count} of 8 selected</p>
        <h1>What identities are part of you?</h1>
        <p>Choose eight specific identities. You’ll place four on your visible ring and four on your hidden ring.</p>
      </section>
      <div class="panel panel-body">
        <div class="selected-strip" aria-label="Selected identities">${selected || '<span class="muted small">Your selections will appear here.</span>'}</div>
        <div class="identity-toolbar">
          <label class="field"><span class="sr-only">Search identities</span><input type="text" data-input="identity-search" value="${esc(state.identitySearch)}" placeholder="Search identities"></label>
          <label class="field"><span class="sr-only">Filter by identity dimension</span><select data-input="category-filter"><option value="all">All dimensions</option>${categoryOptions}</select></label>
        </div>
        <div class="identity-groups">${groups || '<p class="muted">No listed identities match that search. Add your own below.</p>'}</div>
        <form class="custom-add" data-form="custom-identity">
          <label class="field"><span>Identity dimension</span><select name="category" required>${customCategories}</select></label>
          <label class="field"><span>Your identity</span><input name="label" type="text" placeholder="Use your own words" required></label>
          <button class="btn" type="submit" ${count >= 8 ? 'disabled' : ''}>Add</button>
        </form>
        <div class="error" id="identity-error" role="alert"></div>
        <div class="button-row split"><button class="btn" type="button" data-view="profile">Back</button><button class="btn btn-primary" type="button" data-action="finish-identities" ${count === 8 ? '' : 'disabled'}>Map visibility</button></div>
      </div>`, { narrow: true });
  }

  function renderMapping() {
    const visibleCount = state.draft.identities.filter(item => item.placement === 'visible').length;
    const hiddenCount = state.draft.identities.filter(item => item.placement === 'hidden').length;
    const placementComplete = visibleCount === 4 && hiddenCount === 4;
    const cards = state.draft.identities.map(item => `<article class="identity-card">
      <div class="identity-card-head"><div><h2>${esc(item.label)}</h2><p>${esc(categoryLabel(item.category))}</p></div><span class="salience" aria-label="Salience ${item.salience} of 3">${dots(item.salience)}</span></div>
      <div class="identity-card-fields">
        <div>
          <p class="field-label">How is this identity usually known to others?</p>
          <div class="segments" role="group" aria-label="Visibility for ${esc(item.label)}">
            <button class="segment" type="button" data-action="placement" data-id="${item.id}" data-value="visible" aria-pressed="${item.placement === 'visible'}" ${visibleCount >= 4 && item.placement !== 'visible' ? 'disabled' : ''}>Often visible</button>
            <button class="segment" type="button" data-action="placement" data-id="${item.id}" data-value="hidden" aria-pressed="${item.placement === 'hidden'}" ${hiddenCount >= 4 && item.placement !== 'hidden' ? 'disabled' : ''}>Not readily visible</button>
          </div>
        </div>
        <div>
          <p class="field-label">How present is it for you right now?</p>
          <div class="salience-row" role="group" aria-label="Salience for ${esc(item.label)}">
            ${[1,2,3].map(value => `<button class="dot-button" type="button" data-action="salience" data-id="${item.id}" data-value="${value}" aria-label="${value} of 3" aria-pressed="${item.salience === value}">${dots(value)}</button>`).join('')}
          </div>
        </div>
      </div>
    </article>`).join('');
    return shell(`${progress(3, 7, 'Visibility and salience')}
      <section class="screen-heading"><p class="eyebrow">Outer ring ${visibleCount}/4 · Inner ring ${hiddenCount}/4</p><h1>What can others see—and what matters most right now?</h1><p>Place four identities on each ring. Salience describes how present each identity is in your life right now.</p></section>
      <div class="identity-cards">${cards}</div>
      <div class="button-row split"><button class="btn" type="button" data-view="identities">Back</button><button class="btn btn-primary" type="button" data-view="choose-deep" ${placementComplete ? '' : 'disabled'}>Choose two to deepen</button></div>`, { narrow: true });
  }

  function renderChooseDeep() {
    const selected = new Set(state.draft.deepenedIds || []);
    const choices = state.draft.identities.map(item => `<button class="deep-choice" type="button" data-action="toggle-deep" data-id="${item.id}" aria-pressed="${selected.has(item.id)}">
      <span class="check" aria-hidden="true">✓</span><strong>${esc(item.label)}</strong><p>${esc(categoryLabel(item.category))}<br>${esc(placements[item.placement])} · ${dots(item.salience)}</p>
    </button>`).join('');
    return shell(`${progress(4, 7, 'Choose two to explore')}
      <section class="screen-heading"><p class="eyebrow">${selected.size} of 2 selected</p><h1>Which two identities will you explore more deeply?</h1><p>You will connect values, one current priority, roles or relationships, and experiences of access to each identity separately.</p></section>
      <div class="deep-grid">${choices}</div>
      <div class="error" id="deep-choice-error" role="alert"></div>
      <div class="button-row split"><button class="btn" type="button" data-view="mapping">Back</button><button class="btn btn-primary" type="button" data-action="start-deepening" ${selected.size === 2 ? '' : 'disabled'}>Deepen first identity</button></div>`, { narrow: true });
  }

  function renderDeepen() {
    const deepenedIds = state.draft.deepenedIds || [];
    const identity = state.draft.identities.find(item => item.id === deepenedIds[state.deepIndex]);
    if (!identity) { state.view = 'choose-deep'; return renderChooseDeep(); }
    identity.deeper ||= { values: [], priority: '', roles: [], access: '' };
    const info = identity.deeper;
    const valueButtons = values.map(value => choiceChip('deep-value', value, info.values.includes(value))).join('');
    const priorityOptions = priorities.map(value => `<option value="${esc(value)}" ${info.priority === value ? 'selected' : ''}>${esc(value)}</option>`).join('');
    const roleButtons = roles.map(value => choiceChip('deep-role', value, info.roles.includes(value))).join('');
    const accessRadios = accessOptions.map((value, index) => `<label class="radio-option"><input type="radio" name="access" value="${esc(value)}" ${info.access === value ? 'checked' : ''}><span>${esc(value)}</span></label>`).join('');
    const step = state.deepIndex === 0 ? 5 : 6;
    return shell(`${progress(step, 7, `Deepen identity ${state.deepIndex + 1}`)}
      <section class="screen-heading"><p class="eyebrow">${esc(categoryLabel(identity.category))}</p><h1>${esc(identity.label)}</h1><p>Everything on this page will stay attached specifically to this identity.</p></section>
      <form class="panel panel-body" data-form="deepen">
        <section class="option-section">
          <div class="option-section-head"><div><h2>Values</h2><p>Choose up to two that this identity shapes or strengthens.</p></div><span class="small muted">${info.values.length}/2</span></div>
          <div class="option-grid">${valueButtons}</div>
        </section>
        <section class="option-section">
          <div class="option-section-head"><div><h2>Current priority</h2><p>Choose the one priority most connected to this identity right now.</p></div></div>
          <label class="field"><span class="sr-only">Current priority</span><select name="priority"><option value="">Choose one priority</option>${priorityOptions}</select></label>
        </section>
        <section class="option-section">
          <div class="option-section-head"><div><h2>Roles and relationships</h2><p>Choose up to two places where this identity shapes how you show up.</p></div><span class="small muted">${info.roles.length}/2</span></div>
          <div class="option-grid">${roleButtons}</div>
        </section>
        <section class="option-section">
          <div class="option-section-head"><div><h2>Access and treatment</h2><p>Because of how people or systems respond to this identity, I most often experience:</p></div></div>
          <div class="radio-list">${accessRadios}</div>
        </section>
        <div class="error" id="deepen-error" role="alert"></div>
        <div class="button-row split"><button class="btn" type="button" data-action="deepen-back">Back</button><button class="btn btn-primary" type="submit">${state.deepIndex === 0 ? 'Next identity' : 'Review my ring'}</button></div>
      </form>`, { narrow: true });
  }

  function choiceChip(action, value, selected) {
    return `<button class="chip ${selected ? 'selected' : ''}" type="button" data-action="${action}" data-value="${esc(value)}" aria-pressed="${selected}">${esc(value)}</button>`;
  }

  function renderReview() {
    const profile = state.draft;
    return shell(`${progress(7, 7, 'Review your ring')}
      <section class="screen-heading"><p class="eyebrow">Your identity ring</p><h1>Review what you want to add to the web.</h1><p>Your eight identities form the two rings. The values, priority, roles, and access response remain attached to the two identities you deepened.</p></section>
      <div class="review-layout">
        <div class="panel ring-card">${ringSvg(profile, false)}${ringLegend()}</div>
        <div class="panel panel-body"><div class="review-list">${reviewRows(profile)}</div></div>
      </div>
      <div class="button-row split"><button class="btn" type="button" data-view="choose-deep">Edit</button><button class="btn btn-primary" type="button" data-action="submit-profile">Create my web</button></div>`);
  }

  function renderRing() {
    const profile = currentProfile();
    return shell(`<section class="screen-heading"><p class="eyebrow">${esc(profile.firstName)} ${esc(profile.lastName)} · ${esc(communityLabel(profile.community))}</p><h1>My identity ring</h1><p>Outer placement shows identities often seen or read by others. Inner placement shows identities that are not readily visible. Shade and dots show salience.</p></section>
      <div class="ring-summary">
        <div class="panel ring-card">${ringSvg(profile, true)}${ringLegend()}</div>
        <div class="panel panel-body"><div class="review-list">${reviewRows(profile)}</div><div class="button-row"><button class="btn btn-primary" type="button" data-action="edit-profile">Edit my assessment</button></div></div>
      </div>`, { tabs: true, activeTab: 'ring' });
  }

  function ringLegend() {
    return `<div class="legend" aria-label="Ring legend"><span class="legend-item"><span class="ring-key outer"></span>Outer · often visible</span><span class="legend-item"><span class="ring-key inner"></span>Inner · not readily visible</span><span class="legend-item"><span class="legend-swatch high"></span>High salience</span><span class="legend-item"><span class="legend-swatch mid"></span>Medium</span><span class="legend-item"><span class="legend-swatch low"></span>Lower</span></div>`;
  }

  function reviewRows(profile) {
    return profile.identities.map(item => {
      const d = item.deeper;
      return `<article class="review-row"><div><strong>${esc(item.label)}</strong><p>${esc(categoryLabel(item.category))} · ${esc(placements[item.placement])}</p>${d ? `<p class="vpr-summary"><b>Values:</b> ${esc(d.values.join(', '))}<br><b>Priority:</b> ${esc(d.priority)}<br><b>Roles:</b> ${esc(d.roles.join(', '))}<br><b>Access:</b> ${esc(d.access)}</p>` : ''}</div><span class="salience" aria-label="Salience ${item.salience} of 3">${dots(item.salience)}</span></article>`;
    }).join('');
  }

  function ringSvg(profile, interactive) {
    const width = 400, height = 360, cx = 203, cy = 170;
    const nodes = profile.identities.map(item => {
      const angle = identityAngle(profile, item);
      // Keep every node centered directly on its assigned visibility ring.
      const radius = item.placement === 'visible' ? 126 : 58;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      const angleCos = Math.cos(angle);
      const angleSin = Math.sin(angle);
      const edge = item.placement === 'visible' && Math.abs(angleCos) > .85;
      const labelLines = ringDisplayLines(item.label, edge ? 8 : item.placement === 'hidden' ? 10 : 14);
      const labelOffset = item.placement === 'hidden' ? 12 : 17;
      const labelX = cx + angleCos * (radius + labelOffset);
      const labelY = cy + angleSin * (radius + labelOffset);
      let labelStartY = edge ? labelY - ((labelLines.length - 1) * 5) : angleSin < -.25 ? labelY - ((labelLines.length - 1) * 10) : labelY;
      let dotsY = edge ? labelY + 13 : angleSin < -.25 ? labelY + 10 : labelY + (labelLines.length * 10) + 1;
      if (item.placement === 'visible' && angleSin < -.85) {
        labelStartY = labelY - ((labelLines.length - 1) * 10) - 8;
        dotsY = labelY + 2;
      } else if (item.placement === 'visible' && angleSin > .85) {
        labelStartY = labelY + 7;
        dotsY = labelStartY + ((labelLines.length - 1) * 10) + 12;
      }
      const anchor = angleCos > .25 ? 'start' : angleCos < -.25 ? 'end' : 'middle';
      const nodeAttrs = interactive ? `data-action="ring-identity" data-id="${item.id}" role="button" tabindex="0"` : '';
      const nodeColor = item.placement === 'visible' ? '#005bbb' : '#6657a6';
      return `<g ${nodeAttrs} aria-label="${esc(item.label)}, ${esc(placements[item.placement])}, salience ${item.salience} of 3">
        <title>${esc(item.label)}</title>
        <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="9" fill="${nodeColor}" opacity="${[0,.34,.66,1][item.salience]}" stroke="#fff" stroke-width="2"></circle>
        <text x="${labelX.toFixed(1)}" y="${labelStartY.toFixed(1)}" text-anchor="${anchor}" fill="currentColor" font-size="9.5" font-weight="700">${labelLines.map((line, index) => `<tspan x="${labelX.toFixed(1)}" dy="${index ? 10 : 0}">${esc(line)}</tspan>`).join('')}</text>
        <text x="${labelX.toFixed(1)}" y="${dotsY.toFixed(1)}" text-anchor="${anchor}" fill="#5d6b7c" font-size="8">${dots(item.salience)}</text>
      </g>`;
    }).join('');
    return `<svg class="ring-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Identity ring for ${esc(profile.firstName)} ${esc(profile.lastName)}">
      <circle cx="${cx}" cy="${cy}" r="126" fill="rgba(0,91,187,.025)" stroke="#005bbb" stroke-width="2"></circle>
      <circle cx="${cx}" cy="${cy}" r="58" fill="rgba(102,87,166,.045)" stroke="#6657a6" stroke-width="2"></circle>
      <circle cx="${cx}" cy="${cy}" r="31" fill="#14263d"></circle>
      <text x="${cx}" y="${cy - 2}" text-anchor="middle" dominant-baseline="middle" fill="#fff" font-size="13" font-weight="800">${esc(initials(profile))}</text>
      <text x="${cx}" y="${cy + 15}" text-anchor="middle" fill="#fff" font-size="9">${esc(profile.firstName)}</text>
      ${nodes}
    </svg>`;
  }

  function shortLabel(text, max) { return text.length > max ? `${text.slice(0, max - 1)}…` : text; }
  function ringDisplayLabel(text) { return ringLabelAliases[text] || shortLabel(text, 18); }
  function ringDisplayLines(text, max) {
    const display = ringDisplayLabel(text);
    if (display.length <= max) return [display];
    const candidates = [];
    [...display].forEach((char, index) => {
      if (char === ' ' || char === '/' || char === '—' || char === '-') candidates.push(char === ' ' ? index : index + 1);
    });
    const split = candidates
      .map(index => ({ index, left: display.slice(0, index).trim(), right: display.slice(index).trim() }))
      .filter(item => item.left && item.right)
      .sort((a, b) => Math.max(a.left.length, a.right.length) - Math.max(b.left.length, b.right.length) || Math.abs(a.index - display.length / 2) - Math.abs(b.index - display.length / 2))[0];
    return split ? [split.left, split.right] : [shortLabel(display, Math.max(max, 11))];
  }

  function matchesBetween(profileA, profileB, mode = 'both') {
    const matches = [];
    profileA.identities.forEach(identityA => {
      profileB.identities.forEach(identityB => {
        if (identityA.category !== identityB.category) return;
        const type = slug(identityA.label) === slug(identityB.label) ? 'exact' : 'dimension';
        if (mode !== 'both' && mode !== type) return;
        matches.push({ identityA, identityB, type });
      });
    });
    return matches;
  }

  function filteredProfiles(anchor, includeWithoutMatch = false) {
    const scopeOwner = currentProfile();
    return allProfiles().filter(profile => {
      if (normalizeEmail(profile.email) === normalizeEmail(anchor.email)) return false;
      if (state.filter === 'building' && profile.community !== scopeOwner.community) return false;
      if (state.filter === 'instructor' && profile.instructor !== scopeOwner.instructor) return false;
      return includeWithoutMatch || graphMatchesBetween(anchor, profile).length > 0;
    });
  }

  function graphMatchesBetween(anchor, peer) {
    return matchesBetween(anchor, peer, state.matchMode).filter(match =>
      state.placementMode === 'all' || match.identityA.placement === state.placementMode
    );
  }

  function departmentMatchesBetween(profileA, profileB) {
    return matchesBetween(profileA, profileB, state.matchMode).filter(match =>
      state.placementMode === 'all' ||
      match.identityA.placement === state.placementMode ||
      match.identityB.placement === state.placementMode
    );
  }

  function departmentProfiles() {
    const scopeOwner = currentProfile();
    return allProfiles().filter(profile => {
      if (state.filter === 'building' && profile.community !== scopeOwner.community) return false;
      if (state.filter === 'instructor' && profile.instructor !== scopeOwner.instructor) return false;
      return true;
    });
  }

  function graphAnchorProfile() {
    const email = normalizeEmail(state.graphFocusEmail || state.currentEmail);
    return allProfiles().find(profile => normalizeEmail(profile.email) === email) || currentProfile();
  }

  function graphFocusIdentity() {
    if (!state.graphIdentityFocus) return null;
    const owner = allProfiles().find(profile => normalizeEmail(profile.email) === normalizeEmail(state.graphIdentityFocus.ownerEmail));
    const identity = owner?.identities.find(item => item.id === state.graphIdentityFocus.id);
    return owner && identity ? { owner, identity } : null;
  }

  function renderWeb() {
    const signedInProfile = currentProfile();
    const profile = graphAnchorProfile();
    const isDepartment = state.networkView === 'department';
    const departmentPeople = isDepartment ? departmentProfiles() : [];
    const departmentEdges = isDepartment ? departmentConnections(departmentPeople) : [];
    const allMatchedPeers = filteredProfiles(profile)
      .map(peer => ({ peer, score: graphMatchesBetween(profile, peer).length }))
      .sort((a, b) => b.score - a.score || a.peer.firstName.localeCompare(b.peer.firstName))
    const displayLimit = window.innerWidth < 640 ? 7 : 10;
    const peers = allMatchedPeers.slice(0, displayLimit).map(item => item.peer);
    const totalIdentityLinks = allMatchedPeers.reduce((total, item) => total + item.score, 0);
    const hiddenPeerCount = Math.max(0, allMatchedPeers.length - peers.length);
    const isMyWeb = normalizeEmail(profile.email) === normalizeEmail(signedInProfile.email);
    const placementOwner = isMyWeb ? 'My' : `${esc(profile.firstName)}’s`;
    return shell(`<div class="explore-head">
      <section class="screen-heading"><p class="eyebrow">${isDepartment ? `Department network · ${departmentPeople.length} CAs · ${departmentEdges.length} connected pairs` : `${esc(profile.firstName)}’s local network · ${allMatchedPeers.length} connected CA${allMatchedPeers.length === 1 ? '' : 's'} · ${totalIdentityLinks} identity link${totalIdentityLinks === 1 ? '' : 's'}`}</p><h1>${isDepartment ? 'Campus Living identity web' : (isMyWeb ? 'Your identity web' : `${esc(profile.firstName)}’s identity web`)}</h1><p>${isDepartment ? 'See the larger web across Campus Living. Tap initials to open that CA’s focused network, or tap a line to compare two CAs.' : 'Tap a CA to center their network. Tap a connection line to compare. Each line may represent one or more identity connections.'}</p></section>
      <div class="graph-controls">
        ${!isDepartment && !isMyWeb ? '<button class="graph-return" type="button" data-action="return-my-web">Return to my web</button>' : ''}
        <label><span class="sr-only">People shown</span><select data-input="graph-filter"><option value="all" ${state.filter === 'all' ? 'selected' : ''}>All Campus Living</option><option value="building" ${state.filter === 'building' ? 'selected' : ''}>My building</option><option value="instructor" ${state.filter === 'instructor' ? 'selected' : ''}>My class</option></select></label>
        <label><span class="sr-only">Connection type</span><select data-input="match-mode"><option value="both" ${state.matchMode === 'both' ? 'selected' : ''}>All connections</option><option value="exact" ${state.matchMode === 'exact' ? 'selected' : ''}>Exact identities</option><option value="dimension" ${state.matchMode === 'dimension' ? 'selected' : ''}>Shared dimensions</option></select></label>
      </div>
    </div>
    <div class="network-view-switch" role="group" aria-label="Choose network view">
      <button class="network-view-button ${!isDepartment ? 'active' : ''}" type="button" data-action="network-view" data-value="local" aria-pressed="${!isDepartment}">My Network</button>
      <button class="network-view-button ${isDepartment ? 'active' : ''}" type="button" data-action="network-view" data-value="department" aria-pressed="${isDepartment}">Department Web</button>
    </div>
    <div class="graph-layer-filters" role="group" aria-label="${isDepartment ? 'Filter department connections by identity placement' : `Filter by ${esc(profile.firstName)}’s identity placement`}">
      <button class="placement-chip ${state.placementMode === 'all' ? 'active' : ''}" type="button" data-action="placement-filter" data-value="all" aria-pressed="${state.placementMode === 'all'}">All identities</button>
      <button class="placement-chip ${state.placementMode === 'visible' ? 'active' : ''}" type="button" data-action="placement-filter" data-value="visible" aria-pressed="${state.placementMode === 'visible'}">${isDepartment ? 'Outer identities' : `${placementOwner} outer identities`}</button>
      <button class="placement-chip ${state.placementMode === 'hidden' ? 'active' : ''}" type="button" data-action="placement-filter" data-value="hidden" aria-pressed="${state.placementMode === 'hidden'}">${isDepartment ? 'Hidden identities' : `${placementOwner} hidden identities`}</button>
    </div>
    <section class="graph-panel" aria-label="Interactive identity web">
      ${(isDepartment ? departmentEdges.length : peers.length) ? `<div class="graph-stage" data-graph-stage>${isDepartment ? departmentGraphSvg(departmentPeople, departmentEdges) : graphSvg(profile, peers)}</div>
        <div class="graph-tools" aria-label="Graph controls"><button class="graph-tool" type="button" data-action="zoom-in" aria-label="Zoom in">+</button><button class="graph-tool" type="button" data-action="zoom-out" aria-label="Zoom out">−</button><button class="graph-tool" type="button" data-action="reset-graph" aria-label="Reset graph">↺</button></div>` : `<div class="graph-empty"><div><h2>No connections in this view yet</h2><p class="muted">Try another filter or connection type.</p><button class="btn" type="button" data-action="show-all">Show all connections</button></div></div>`}
      ${!isDepartment && hiddenPeerCount ? `<div class="graph-more"><strong>${hiddenPeerCount} more connected CA${hiddenPeerCount === 1 ? '' : 's'}</strong><span>Use the filters or recenter the web to explore them.</span></div>` : ''}
      <div class="graph-legend"><span class="legend-item"><span class="line-sample exact"></span>At least one exact identity</span><span class="legend-item"><span class="line-sample dimension"></span>Shared dimension</span>${isDepartment ? '<span class="legend-item"><span class="person-key"></span>CA initials</span>' : '<span class="legend-item"><span class="person-key current"></span>Person in focus</span>'}</div>
    </section>
    <div class="detail-panel"><strong>The rings are still here</strong><p class="small muted">Open My Ring to review visible and hidden placement, salience, and the details attached to each identity. Both web views stay people-only so the larger patterns remain readable.</p></div>`, { tabs: true, activeTab: 'web' });
  }

  function departmentConnections(profiles) {
    const edges = [];
    for (let i = 0; i < profiles.length; i += 1) {
      for (let j = i + 1; j < profiles.length; j += 1) {
        const matches = departmentMatchesBetween(profiles[i], profiles[j]);
        if (matches.length) edges.push({ source: i, target: j, matches });
      }
    }
    return edges;
  }

  function departmentGraphSvg(profiles, edges) {
    const mobile = window.innerWidth < 640;
    const view = mobile ? { width: 420, height: 680, cx: 210, cy: 332, r: 20 } : { width: 900, height: 580, cx: 450, cy: 282, r: 22 };
    const positions = departmentForceLayout(profiles, edges, view, mobile);
    const lines = edges.map((edge, index) => {
      const a = positions[edge.source];
      const b = positions[edge.target];
      const source = profiles[edge.source];
      const target = profiles[edge.target];
      const primary = edge.matches.find(match => match.type === 'exact') || edge.matches[0];
      const lineType = edge.matches.some(match => match.type === 'exact') ? 'exact' : 'dimension';
      const key = `${normalizeEmail(source.email)}|${normalizeEmail(target.email)}|${primary.identityA.id}|${primary.identityB.id}`;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const distance = Math.max(1, Math.hypot(dx, dy));
      const bend = (index % 2 ? 1 : -1) * Math.min(13, distance * .035);
      const nx = -dy / distance;
      const ny = dx / distance;
      const cx = (a.x + b.x) / 2 + nx * bend;
      const cy = (a.y + b.y) / 2 + ny * bend;
      const path = `M ${a.x} ${a.y} Q ${cx.toFixed(2)} ${cy.toFixed(2)}, ${b.x} ${b.y}`;
      return `<g class="people-connection department-connection" data-action="connection-line" data-key="${esc(key)}" role="button" tabindex="0" aria-label="${edge.matches.length} identity connection${edge.matches.length === 1 ? '' : 's'} between ${esc(source.firstName)} and ${esc(target.firstName)}. Open comparison.">
        <path class="connection-line ${lineType}" d="${path}"></path>
        <path class="connection-hit" d="${path}"></path>
      </g>`;
    }).join('');
    const people = profiles.map((profile, index) => departmentPerson(profile, positions[index], view.r)).join('');
    return `<svg class="graph-svg department-graph" viewBox="0 0 ${view.width} ${view.height}" role="img" aria-labelledby="graph-title graph-desc">
      <title id="graph-title">Campus Living department identity network</title>
      <desc id="graph-desc">Every visible node is a CA, labeled by initials. Each line represents one or more identity connections between a pair of CAs.</desc>
      <g id="network-layer" transform="translate(${state.graph.x} ${state.graph.y}) scale(${state.graph.scale})">${lines}${people}</g>
    </svg>`;
  }

  function departmentPerson(profile, position, radius) {
    return `<g class="department-person">
      <g class="person-focus" data-action="focus-person" data-email="${esc(normalizeEmail(profile.email))}" role="button" tabindex="0" aria-label="Open ${esc(profile.firstName)} ${esc(profile.lastName)}’s focused network">
        <circle class="person-core" cx="${position.x}" cy="${position.y}" r="${radius}"></circle>
        <circle class="person-core-hit" cx="${position.x}" cy="${position.y}" r="${radius + 9}"></circle>
        <text class="person-initials" x="${position.x}" y="${position.y}">${esc(initials(profile))}</text>
      </g>
      <title>${esc(profile.firstName)} ${esc(profile.lastName)} · ${esc(profile.community)}</title>
    </g>`;
  }

  function departmentForceLayout(profiles, edges, view, mobile) {
    const count = Math.max(1, profiles.length);
    const orbit = Math.min(view.width, view.height) * (mobile ? .35 : .38);
    const nodes = profiles.map((profile, index) => {
      const angle = -Math.PI / 2 + index * (Math.PI * 2 / count);
      const band = count > 14 ? .58 + (index % 3) * .21 : 1;
      return { x: view.cx + Math.cos(angle) * orbit * band, y: view.cy + Math.sin(angle) * orbit * band, vx: 0, vy: 0 };
    });
    for (let step = 0; step < 150; step += 1) {
      edges.forEach(edge => {
        const a = nodes[edge.source], b = nodes[edge.target];
        let dx = b.x - a.x, dy = b.y - a.y;
        const distance = Math.max(1, Math.hypot(dx, dy));
        const target = mobile ? 112 : 132;
        const pull = (distance - target) * .0028;
        dx /= distance; dy /= distance;
        a.vx += dx * pull; a.vy += dy * pull;
        b.vx -= dx * pull; b.vy -= dy * pull;
      });
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i], b = nodes[j];
          let dx = b.x - a.x, dy = b.y - a.y;
          const distance = Math.max(1, Math.hypot(dx, dy));
          const minimum = view.r * 2 + (mobile ? 18 : 22);
          const repel = 720 / (distance * distance) + Math.max(0, minimum - distance) * .075;
          dx /= distance; dy /= distance;
          a.vx -= dx * repel; a.vy -= dy * repel;
          b.vx += dx * repel; b.vy += dy * repel;
        }
      }
      nodes.forEach(node => {
        node.vx += (view.cx - node.x) * .0008;
        node.vy += (view.cy - node.y) * .0008;
        node.vx *= .79; node.vy *= .79;
        node.x += node.vx; node.y += node.vy;
        node.x = Math.max(view.r + 16, Math.min(view.width - view.r - 16, node.x));
        node.y = Math.max(view.r + 16, Math.min(view.height - view.r - 16, node.y));
      });
    }
    return nodes.map(node => ({ x: +node.x.toFixed(2), y: +node.y.toFixed(2) }));
  }

  function graphSvg(profile, peers) {
    const mobile = window.innerWidth < 640;
    const view = mobile ? { width: 420, height: 680, cx: 210, cy: 330, currentR: 34, peerR: 27 } : { width: 900, height: 580, cx: 450, cy: 285, currentR: 38, peerR: 29 };
    const currentPos = { x: view.cx, y: view.cy, r: view.currentR };
    const peerPositions = forceLayout(profile, peers, view, mobile);
    const connectionParts = peers.map((peer, peerIndex) => {
      const peerPos = peerPositions[peerIndex];
      const matches = graphMatchesBetween(profile, peer);
      const primary = matches.find(match => match.type === 'exact') || matches[0];
      const lineType = matches.some(match => match.type === 'exact') ? 'exact' : 'dimension';
      const key = `${normalizeEmail(profile.email)}|${normalizeEmail(peer.email)}|${primary.identityA.id}|${primary.identityB.id}`;
      const dx = peerPos.x - currentPos.x;
      const dy = peerPos.y - currentPos.y;
      const bend = (peerIndex % 2 ? 1 : -1) * Math.min(18, Math.hypot(dx, dy) * .055);
      const distance = Math.max(1, Math.hypot(dx, dy));
      const nx = -dy / distance;
      const ny = dx / distance;
      const c1 = { x: currentPos.x + dx * .34 + nx * bend, y: currentPos.y + dy * .34 + ny * bend };
      const c2 = { x: currentPos.x + dx * .66 + nx * bend, y: currentPos.y + dy * .66 + ny * bend };
      const path = `M ${currentPos.x} ${currentPos.y} C ${c1.x.toFixed(2)} ${c1.y.toFixed(2)}, ${c2.x.toFixed(2)} ${c2.y.toFixed(2)}, ${peerPos.x} ${peerPos.y}`;
      return `<g class="people-connection" data-action="connection-line" data-key="${esc(key)}" role="button" tabindex="0" aria-label="${matches.length} identity connection${matches.length === 1 ? '' : 's'} between ${esc(profile.firstName)} and ${esc(peer.firstName)}. Open comparison.">
        <path class="connection-line ${lineType}" d="${path}"></path>
        <path class="connection-hit" d="${path}"></path>
      </g>`;
    });
    const people = [graphPerson(profile, currentPos, true), ...peers.map((peer, index) => graphPerson(peer, peerPositions[index], false))].join('');
    return `<svg class="graph-svg" viewBox="0 0 ${view.width} ${view.height}" role="img" aria-labelledby="graph-title graph-desc">
      <title id="graph-title">Identity connections centered on ${esc(profile.firstName)} ${esc(profile.lastName)}</title>
      <desc id="graph-desc">A focused people network. Each line represents one or more identity connections. Solid blue lines include an exact identity; dashed teal lines show a shared identity dimension.</desc>
      <g id="network-layer" transform="translate(${state.graph.x} ${state.graph.y}) scale(${state.graph.scale})">${connectionParts.join('')}${people}</g>
    </svg>`;
  }

  function bezierPoint(a, c1, c2, b, t) {
    const u = 1 - t;
    return {
      x: u ** 3 * a.x + 3 * u ** 2 * t * c1.x + 3 * u * t ** 2 * c2.x + t ** 3 * b.x,
      y: u ** 3 * a.y + 3 * u ** 2 * t * c1.y + 3 * u * t ** 2 * c2.y + t ** 3 * b.y
    };
  }

  function routeConnection(a, b, baseLane, obstacles, allRings, identityPoints, usedMarkers, mobile) {
    const dx = b.x - a.x, dy = b.y - a.y;
    const distance = Math.max(1, Math.hypot(dx, dy));
    const nx = -dy / distance, ny = dx / distance;
    const alternatives = [0, 24, -24, 48, -48, 72, -72, 96, -96, 120, -120].map(offset => baseLane + offset);
    let best = null;
    alternatives.forEach(lane => {
      const c1 = { x: a.x + dx * .34 + nx * lane, y: a.y + dy * .34 + ny * lane };
      const c2 = { x: a.x + dx * .66 + nx * lane, y: a.y + dy * .66 + ny * lane };
      let pathClearance = Infinity;
      for (let step = 1; step < 20; step += 1) {
        const point = bezierPoint(a, c1, c2, b, step / 20);
        obstacles.forEach(ring => {
          pathClearance = Math.min(pathClearance, Math.hypot(point.x - ring.x, point.y - ring.y) - ring.r - 13);
        });
      }
      const markerTimes = [.5, .44, .56, .38, .62, .32, .68, .26, .74, .2, .8];
      let marker = null;
      markerTimes.forEach(t => {
        const point = bezierPoint(a, c1, c2, b, t);
        const ringClearance = allRings.reduce((minimum, ring) => Math.min(minimum, Math.hypot(point.x - ring.x, point.y - ring.y) - ring.r - 13), Infinity);
        const nodeClearance = identityPoints.reduce((minimum, node) => Math.min(minimum, Math.hypot(point.x - node.x, point.y - node.y) - 15), Infinity);
        const markerClearance = usedMarkers.reduce((minimum, other) => Math.min(minimum, Math.hypot(point.x - other.x, point.y - other.y) - 13), Infinity);
        const boundaryClearance = Math.min(point.x - 12, (mobile ? 420 : 900) - point.x - 12, point.y - 12, (mobile ? 720 : 620) - point.y - 12);
        const clearance = Math.min(ringClearance, nodeClearance, markerClearance, boundaryClearance);
        if (!marker || clearance > marker.clearance) marker = { ...point, clearance };
      });
      const valid = pathClearance >= 0 && marker.clearance >= 0;
      const score = Math.min(pathClearance, marker.clearance);
      if (!best || (valid && !best.valid) || (valid === best.valid && score > best.score)) best = { c1, c2, marker, score, valid };
    });
    return best;
  }

  function forceLayout(profile, peers, view, mobile) {
    const orbit = mobile ? 205 : 245;
    const nodes = peers.map((peer, index) => {
      const angle = -Math.PI / 2 + index * (Math.PI * 2 / Math.max(1, peers.length));
      return {
        x: view.cx + Math.cos(angle) * orbit,
        y: view.cy + Math.sin(angle) * orbit,
        vx: 0,
        vy: 0,
        r: view.peerR,
        angle,
        strength: graphMatchesBetween(profile, peer).length
      };
    });
    for (let step = 0; step < 110; step += 1) {
      const heat = 1 - step / 110;
      nodes.forEach(node => {
        const dx = view.cx - node.x, dy = view.cy - node.y;
        const distance = Math.max(1, Math.hypot(dx, dy));
        const target = orbit - Math.min(34, node.strength * 5);
        const spring = (distance - target) * .022;
        const anchorX = view.cx + Math.cos(node.angle) * target;
        const anchorY = view.cy + Math.sin(node.angle) * target;
        node.vx += dx / distance * spring + (anchorX - node.x) * .012;
        node.vy += dy / distance * spring + (anchorY - node.y) * .012;
      });
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i], b = nodes[j];
          let dx = b.x - a.x, dy = b.y - a.y;
          const distance = Math.max(1, Math.hypot(dx, dy));
          const minimum = a.r + b.r + (mobile ? 34 : 46);
          const repel = 950 / (distance * distance) + Math.max(0, minimum - distance) * .12;
          dx /= distance; dy /= distance;
          a.vx -= dx * repel; a.vy -= dy * repel;
          b.vx += dx * repel; b.vy += dy * repel;
        }
      }
      nodes.forEach(node => {
        const centerDx = node.x - view.cx, centerDy = node.y - view.cy;
        const centerDistance = Math.max(1, Math.hypot(centerDx, centerDy));
        const centerMinimum = view.currentR + node.r + 38;
        if (centerDistance < centerMinimum) {
          const push = (centerMinimum - centerDistance) * .18;
          node.vx += centerDx / centerDistance * push;
          node.vy += centerDy / centerDistance * push;
        }
        node.vx *= .74; node.vy *= .74;
        node.x += node.vx * (.5 + heat * .5);
        node.y += node.vy * (.5 + heat * .5);
        node.x = Math.max(node.r + 22, Math.min(view.width - node.r - 22, node.x));
        node.y = Math.max(node.r + 22, Math.min(view.height - node.r - 34, node.y));
      });
    }
    return nodes.map(node => ({ x: +node.x.toFixed(2), y: +node.y.toFixed(2), r: node.r }));
  }

  function graphIdentityPoint(profile, identity, position) {
    const angle = identityAngle(profile, identity);
    // These values match the two circles drawn in graphPerson so nodes never
    // appear to float just inside or outside their ring.
    const radius = identity.placement === 'visible' ? position.r + 4 : position.r * .48;
    return { x: +(position.x + Math.cos(angle) * radius).toFixed(2), y: +(position.y + Math.sin(angle) * radius).toFixed(2) };
  }

  function graphPerson(profile, position, current) {
    const coreRadius = current ? 28 : 23;
    return `<g class="person-node ${current ? 'current' : ''}">
      <circle class="person-halo" cx="${position.x}" cy="${position.y}" r="${coreRadius + 8}"></circle>
      <g class="person-focus" data-action="focus-person" data-email="${esc(normalizeEmail(profile.email))}" role="button" tabindex="0" aria-label="Center the graph on ${esc(profile.firstName)} ${esc(profile.lastName)}">
        <circle class="person-core ${current ? 'current' : ''}" cx="${position.x}" cy="${position.y}" r="${coreRadius}"></circle>
        <circle class="person-core-hit" cx="${position.x}" cy="${position.y}" r="${coreRadius + 10}"></circle>
        <text class="person-initials" x="${position.x}" y="${position.y}">${esc(initials(profile))}</text>
      </g>
      <text class="person-name" x="${position.x}" y="${position.y + coreRadius + 22}">${esc(profile.firstName)} · ${esc(profile.community)}</text>
      ${current ? `<text class="person-status" x="${position.x}" y="${position.y + coreRadius + 37}">In focus</text>` : ''}
    </g>`;
  }

  function identityAngle(profile, identity) {
    const peers = profile.identities.filter(item => item.placement === identity.placement);
    const index = Math.max(0, peers.findIndex(item => item.id === identity.id));
    const cardinal = {
      1: [-90],
      2: [-90, 90],
      3: [-90, 0, 180],
      4: [-90, 0, 90, 180]
    };
    const diagonal = {
      1: [-45],
      2: [-45, 135],
      3: [-45, 45, 225],
      4: [-45, 45, 135, 225]
    };
    const primary = identity.placement === 'hidden' ? diagonal : cardinal;
    const secondary = identity.placement === 'hidden' ? cardinal[4] : diagonal[4];
    const angles = peers.length <= 4 ? primary[peers.length] : [...primary[4], ...secondary];
    return angles[index % angles.length] * Math.PI / 180;
  }

  function setGraphTransform() {
    const layer = document.getElementById('network-layer');
    if (layer) layer.setAttribute('transform', `translate(${state.graph.x} ${state.graph.y}) scale(${state.graph.scale})`);
  }

  function renderIdentityHome() {
    const profile = currentProfile();
    const cards = profile.identities.map(identity => {
      const connected = allProfiles().filter(peer => normalizeEmail(peer.email) !== normalizeEmail(profile.email) && peer.identities.some(item => item.category === identity.category));
      const exact = connected.filter(peer => peer.identities.some(item => item.category === identity.category && slug(item.label) === slug(identity.label))).length;
      return `<button class="deep-choice" type="button" data-action="open-identity" data-owner="${esc(normalizeEmail(profile.email))}" data-id="${esc(identity.id)}">
        <span class="check" aria-hidden="true">→</span><strong>${esc(identity.label)}</strong><p>${esc(categoryLabel(identity.category))}<br>${exact} exact · ${connected.length - exact} related</p>
      </button>`;
    }).join('');
    return shell(`<section class="screen-heading"><p class="eyebrow">Explore by identity</p><h1>Where do your identities connect?</h1><p>Choose one identity to see everyone connected through the same specific identity or the broader identity dimension.</p></section><div class="deep-grid">${cards}</div>`, { tabs: true, activeTab: 'explore' });
  }

  function selectedAnchor() {
    const ownerEmail = state.selectedOwnerEmail || state.currentEmail;
    const owner = allProfiles().find(profile => normalizeEmail(profile.email) === normalizeEmail(ownerEmail)) || currentProfile();
    const identity = owner.identities.find(item => item.id === state.selectedIdentityId) || owner.identities[0];
    return { owner, identity };
  }

  function connectionsForIdentity(owner, identity) {
    return allProfiles().filter(profile => normalizeEmail(profile.email) !== normalizeEmail(owner.email)).map(profile => {
      const matches = profile.identities.filter(item => item.category === identity.category);
      if (!matches.length) return null;
      const match = matches.find(item => slug(item.label) === slug(identity.label)) || matches[0];
      return { profile, identity: match, type: slug(match.label) === slug(identity.label) ? 'exact' : 'dimension' };
    }).filter(Boolean).sort((a, b) => a.type === b.type ? a.profile.firstName.localeCompare(b.profile.firstName) : a.type === 'exact' ? -1 : 1);
  }

  function renderIdentityConnections() {
    const { owner, identity } = selectedAnchor();
    state.selectedOwnerEmail = normalizeEmail(owner.email);
    state.selectedIdentityId = identity.id;
    const connections = connectionsForIdentity(owner, identity);
    const deepened = [identity, ...connections.map(item => item.identity)].filter(item => item.deeper).map(item => item.deeper);
    const patterns = patternCounts(deepened);
    const rows = connections.map(item => `<article class="person-row">
      <span class="avatar">${esc(initials(item.profile))}</span>
      <div><strong>${esc(item.profile.firstName)} ${esc(item.profile.lastName)}</strong><p>${esc(communityLabel(item.profile.community))} · ${esc(item.identity.label)} · ${dots(item.identity.salience)}</p><span class="match-label"><span class="match-dot ${item.type === 'exact' ? 'exact' : ''}"></span>${item.type === 'exact' ? 'Exact identity' : 'Shared dimension'}</span></div>
      <button class="btn btn-sm" type="button" data-action="compare-peer" data-email="${esc(normalizeEmail(item.profile.email))}">Compare</button>
    </article>`).join('');
    return shell(`<section class="screen-heading"><p class="eyebrow">${esc(categoryLabel(identity.category))}</p><h1>${esc(identity.label)}</h1><p>${connections.length} CA${connections.length === 1 ? '' : 's'} connect through this identity dimension. Exact identities and related identities remain distinct.</p></section>
      <div class="panel panel-body">
        <h2>Patterns across deepened identities</h2>
        <p class="small muted">These patterns include only people who chose to deepen this identity.</p>
        <div class="pattern-strip">${patterns.length ? patterns.map(item => `<span class="pattern"><b>${item.count}</b>${esc(item.label)}</span>`).join('') : '<span class="muted small">No VPR patterns are available yet.</span>'}</div>
      </div>
      <div class="connection-list">${rows || '<div class="panel panel-body"><p>No other profiles currently use this identity dimension.</p></div>'}</div>
      <div class="button-row split"><button class="btn" type="button" data-view="web">Back to web</button><button class="btn" type="button" data-view="identity-home">Explore another identity</button></div>`, { tabs: true, activeTab: 'explore' });
  }

  function patternCounts(deepened) {
    const counts = new Map();
    deepened.forEach(item => {
      [...item.values, item.priority, ...item.roles].filter(Boolean).forEach(label => counts.set(label, (counts.get(label) || 0) + 1));
    });
    return [...counts.entries()].map(([label, count]) => ({ label, count })).filter(item => item.count > 1).sort((a,b) => b.count - a.count || a.label.localeCompare(b.label)).slice(0, 8);
  }

  function renderCompare() {
    const { owner, identity: identityA } = selectedAnchor();
    const peer = allProfiles().find(profile => normalizeEmail(profile.email) === normalizeEmail(state.selectedPeerEmail));
    if (!peer) { state.view = 'identity'; return renderIdentityConnections(); }
    const peerMatches = peer.identities.filter(item => item.category === identityA.category);
    const identityB = peerMatches.find(item => slug(item.label) === slug(identityA.label)) || peerMatches[0];
    if (!identityB) { state.view = 'identity'; return renderIdentityConnections(); }
    const compare = comparisonColumns(identityA, identityB);
    return shell(`<section class="screen-heading"><p class="eyebrow">Two-person comparison · ${esc(categoryLabel(identityA.category))}</p><h1>${esc(owner.firstName)} + ${esc(peer.firstName)}</h1><p>Sharing an identity dimension does not mean sharing the same identity, experience, values, or priorities.</p></section>
      <div class="panel panel-body">
        ${comparisonTable(owner.firstName, peer.firstName, compare)}
      </div>
      <div class="button-row split"><button class="btn" type="button" data-view="identity">Back to identity</button><button class="btn btn-primary" type="button" data-view="web">Return to web</button></div>`, { tabs: true, activeTab: 'explore' });
  }

  function comparisonColumns(identityA, identityB) {
    const a = identityA.deeper || { values: [], priority: '', roles: [], access: '' };
    const b = identityB.deeper || { values: [], priority: '', roles: [], access: '' };
    const sharedValues = a.values.filter(value => b.values.includes(value));
    const sharedRoles = a.roles.filter(value => b.roles.includes(value));
    const sharedPriority = a.priority && a.priority === b.priority ? [a.priority] : [];
    const sharedAccess = a.access && a.access === b.access ? [a.access] : [];
    const sharedPlacement = identityA.placement === identityB.placement ? [placements[identityA.placement]] : [];
    const sharedSalience = identityA.salience === identityB.salience ? [dots(identityA.salience)] : [];
    return {
      left: {
        identity: [identityA.label], values: a.values.filter(value => !sharedValues.includes(value)), priority: sharedPriority.length ? [] : [a.priority].filter(Boolean), roles: a.roles.filter(value => !sharedRoles.includes(value)), access: sharedAccess.length ? [] : [a.access].filter(Boolean), visibility: sharedPlacement.length ? [] : [placements[identityA.placement]], salience: sharedSalience.length ? [] : [dots(identityA.salience)]
      },
      shared: { identity: slug(identityA.label) === slug(identityB.label) ? [identityA.label] : [categoryLabel(identityA.category)], values: sharedValues, priority: sharedPriority, roles: sharedRoles, access: sharedAccess, visibility: sharedPlacement, salience: sharedSalience },
      right: {
        identity: [identityB.label], values: b.values.filter(value => !sharedValues.includes(value)), priority: sharedPriority.length ? [] : [b.priority].filter(Boolean), roles: b.roles.filter(value => !sharedRoles.includes(value)), access: sharedAccess.length ? [] : [b.access].filter(Boolean), visibility: sharedPlacement.length ? [] : [placements[identityB.placement]], salience: sharedSalience.length ? [] : [dots(identityB.salience)]
      }
    };
  }

  function comparisonTable(ownerName, peerName, compare) {
    const fields = [['Identity', 'identity'], ['Values', 'values'], ['Priority', 'priority'], ['Roles', 'roles'], ['Visibility', 'visibility'], ['Salience', 'salience'], ['Access', 'access']];
    const cell = (items, shared = false) => `<td class="${shared ? 'shared' : ''}">${items.length ? items.map(item => `<span>${esc(item)}</span>`).join('') : '<span class="muted">—</span>'}</td>`;
    return `<div class="compare-sections" aria-label="Values, priorities, roles, visibility, salience, and access comparison">
      ${fields.map(([label, key]) => `<section class="compare-block">
        <h2>${label}</h2>
        <table class="compare-table" aria-label="${label} comparison">
          <thead><tr><th scope="col">${esc(ownerName)}</th><th class="shared" scope="col">Shared</th><th scope="col">${esc(peerName)}</th></tr></thead>
          <tbody><tr>${cell(compare.left[key])}${cell(compare.shared[key], true)}${cell(compare.right[key])}</tr></tbody>
        </table>
      </section>`).join('')}
    </div>`;
  }

  app.addEventListener('submit', event => {
    const form = event.target.closest('form');
    if (!form) return;
    event.preventDefault();

    if (form.dataset.form === 'lookup') {
      const email = normalizeEmail(new FormData(form).get('email'));
      const error = document.getElementById('lookup-error');
      if (!email.endsWith('@buffalo.edu') || email.length < 13) {
        error.textContent = 'Enter a valid UB email ending in @buffalo.edu.';
        return;
      }
      const existing = allProfiles().find(profile => normalizeEmail(profile.email) === email);
      state.currentEmail = email;
      state.selectedOwnerEmail = email;
      state.graphFocusEmail = email;
      state.graphIdentityFocus = null;
      if (existing) {
        state.draft = null;
        state.view = 'web';
      } else {
        state.draft = { firstName: '', lastName: '', email, instructor: '', community: '', identities: [], deepenedIds: [] };
        state.view = 'profile';
      }
      render();
      return;
    }

    if (form.dataset.form === 'profile') {
      const data = Object.fromEntries(new FormData(form));
      const error = document.getElementById('profile-error');
      const email = normalizeEmail(data.email);
      if (!data.firstName.trim() || !data.lastName.trim() || !email.endsWith('@buffalo.edu') || !data.instructor || !data.community) {
        error.textContent = 'Complete every field using a valid UB email.';
        return;
      }
      state.currentEmail = email;
      state.selectedOwnerEmail = email;
      state.draft = {
        ...(state.draft || {}),
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email,
        instructor: data.instructor,
        community: data.community,
        identities: state.draft?.identities || [],
        deepenedIds: state.draft?.deepenedIds || []
      };
      state.view = 'identities';
      render();
      return;
    }

    if (form.dataset.form === 'custom-identity') {
      const data = Object.fromEntries(new FormData(form));
      const label = data.label.trim();
      const error = document.getElementById('identity-error');
      if (!label) { error.textContent = 'Enter the identity language you want to use.'; return; }
      if (state.draft.identities.length >= 8) { error.textContent = 'You already selected eight identities.'; return; }
      const id = `${data.category}-${slug(label)}`;
      if (state.draft.identities.some(item => item.id === id)) { error.textContent = 'That identity is already selected.'; return; }
      state.draft.identities.push(ident(data.category, label, null, 2));
      form.reset();
      render(false);
      return;
    }

    if (form.dataset.form === 'deepen') {
      const identity = state.draft.identities.find(item => item.id === state.draft.deepenedIds[state.deepIndex]);
      const data = new FormData(form);
      identity.deeper.priority = String(data.get('priority') || '');
      identity.deeper.access = String(data.get('access') || '');
      const error = document.getElementById('deepen-error');
      if (!identity.deeper.values.length || !identity.deeper.priority || !identity.deeper.roles.length || !identity.deeper.access) {
        error.textContent = 'Choose at least one value and role, plus one priority and access response.';
        return;
      }
      if (state.deepIndex === 0) {
        state.deepIndex = 1;
        state.view = 'deepen';
      } else {
        state.view = 'review';
      }
      render();
    }
  });

  app.addEventListener('input', event => {
    if (event.target.matches('[data-input="identity-search"]')) {
      const start = event.target.selectionStart;
      state.identitySearch = event.target.value;
      render(false);
      requestAnimationFrame(() => {
        const input = document.querySelector('[data-input="identity-search"]');
        if (input) { input.focus(); input.setSelectionRange(start, start); }
      });
    }
  });

  app.addEventListener('change', event => {
    if (event.target.matches('[data-input="category-filter"]')) {
      state.categoryFilter = event.target.value;
      render(false);
    }
    if (event.target.matches('[data-input="graph-filter"]')) {
      state.filter = event.target.value;
      state.graphFocusEmail = state.currentEmail;
      state.graphIdentityFocus = null;
      state.graph = { scale: 1, x: 0, y: 0 };
      render(false);
    }
    if (event.target.matches('[data-input="match-mode"]')) {
      state.matchMode = event.target.value;
      state.graphIdentityFocus = null;
      state.graph = { scale: 1, x: 0, y: 0 };
      render(false);
    }
  });

  app.addEventListener('click', event => {
    const target = event.target.closest('button, [role="button"]');
    if (!target) return;
    const action = target.dataset.action;
    const view = target.dataset.view;

    if (state.graphMoved && ['graph-identity', 'midpoint', 'connection-line', 'focus-person'].includes(action)) {
      state.graphMoved = false;
      return;
    }

    if (view) {
      if (view === 'web') {
        state.graphFocusEmail = state.currentEmail;
        state.graphIdentityFocus = null;
        state.graph = { scale: 1, x: 0, y: 0 };
      }
      if (view === 'identity-home') {
        state.selectedOwnerEmail = state.currentEmail;
        state.selectedIdentityId = currentProfile().identities[0]?.id || null;
      }
      state.view = view;
      render();
      return;
    }

    if (action === 'home') {
      state.view = currentProfile() && state.currentEmail ? 'web' : 'welcome';
      render();
    } else if (action === 'switch-profile') {
      state.view = 'welcome'; state.currentEmail = ''; state.draft = null; state.selectedOwnerEmail = null; state.selectedPeerEmail = null; state.graphFocusEmail = ''; state.graphIdentityFocus = null;
      render();
    } else if (action === 'demo') {
      state.currentEmail = 'maya.chen@buffalo.edu'; state.selectedOwnerEmail = state.currentEmail; state.graphFocusEmail = state.currentEmail; state.graphIdentityFocus = null; state.draft = null; state.view = 'web';
      render();
    } else if (action === 'cancel-profile') {
      state.view = 'welcome'; state.currentEmail = ''; state.draft = null;
      render();
    } else if (action === 'toggle-identity') {
      const existing = state.draft.identities.find(item => item.id === target.dataset.id);
      if (existing) {
        state.draft.identities = state.draft.identities.filter(item => item.id !== target.dataset.id);
        state.draft.deepenedIds = state.draft.deepenedIds.filter(id => id !== target.dataset.id);
      } else if (state.draft.identities.length < 8) {
        state.draft.identities.push(ident(target.dataset.category, target.dataset.label, null, 2));
      }
      render(false);
    } else if (action === 'remove-identity') {
      state.draft.identities = state.draft.identities.filter(item => item.id !== target.dataset.id);
      state.draft.deepenedIds = state.draft.deepenedIds.filter(id => id !== target.dataset.id);
      render(false);
    } else if (action === 'finish-identities') {
      if (state.draft.identities.length === 8) { state.view = 'mapping'; render(); }
    } else if (action === 'placement') {
      const identity = state.draft.identities.find(item => item.id === target.dataset.id);
      if (identity) identity.placement = target.dataset.value;
      render(false);
    } else if (action === 'salience') {
      const identity = state.draft.identities.find(item => item.id === target.dataset.id);
      if (identity) identity.salience = Number(target.dataset.value);
      render(false);
    } else if (action === 'toggle-deep') {
      const selected = state.draft.deepenedIds || [];
      if (selected.includes(target.dataset.id)) state.draft.deepenedIds = selected.filter(id => id !== target.dataset.id);
      else if (selected.length < 2) state.draft.deepenedIds = [...selected, target.dataset.id];
      render(false);
    } else if (action === 'start-deepening') {
      if (state.draft.deepenedIds.length === 2) { state.deepIndex = 0; state.view = 'deepen'; render(); }
    } else if (action === 'deep-value') {
      toggleDeepArray('values', target.dataset.value, 2);
    } else if (action === 'deep-role') {
      toggleDeepArray('roles', target.dataset.value, 2);
    } else if (action === 'deepen-back') {
      if (state.deepIndex === 0) state.view = 'choose-deep';
      else state.deepIndex = 0;
      render();
    } else if (action === 'submit-profile') {
      saveProfile(state.draft);
      state.draft = null;
      state.filter = 'all'; state.matchMode = 'both'; state.graphFocusEmail = state.currentEmail; state.graphIdentityFocus = null; state.graph = { scale: 1, x: 0, y: 0 };
      state.view = 'web';
      render();
    } else if (action === 'edit-profile') {
      state.draft = clone(currentProfile());
      state.view = 'profile';
      render();
    } else if (action === 'network-view') {
      state.networkView = target.dataset.value === 'department' ? 'department' : 'local';
      if (state.networkView === 'local' && !state.graphFocusEmail) state.graphFocusEmail = state.currentEmail;
      state.graphIdentityFocus = null;
      state.graph = { scale: 1, x: 0, y: 0 };
      render(false);
    } else if (action === 'placement-filter') {
      state.placementMode = target.dataset.value;
      state.graphIdentityFocus = null;
      state.graph = { scale: 1, x: 0, y: 0 };
      render(false);
    } else if (action === 'graph-identity') {
      state.graphIdentityFocus = { ownerEmail: target.dataset.owner, id: target.dataset.id };
      render(false);
    } else if (action === 'clear-graph-identity') {
      state.graphIdentityFocus = null;
      render(false);
    } else if (action === 'explore-focused-identity') {
      const focus = graphFocusIdentity();
      if (focus) {
        state.selectedOwnerEmail = focus.owner.email;
        state.selectedIdentityId = focus.identity.id;
        state.view = 'identity';
        render();
      }
    } else if (action === 'focus-person') {
      state.networkView = 'local';
      state.graphFocusEmail = target.dataset.email;
      state.graphIdentityFocus = null;
      state.graph = { scale: 1, x: 0, y: 0 };
      render(false);
    } else if (action === 'return-my-web') {
      state.graphFocusEmail = state.currentEmail;
      state.graphIdentityFocus = null;
      state.graph = { scale: 1, x: 0, y: 0 };
      render(false);
    } else if (['open-identity', 'ring-identity'].includes(action)) {
      state.selectedOwnerEmail = target.dataset.owner || state.currentEmail;
      state.selectedIdentityId = target.dataset.id;
      state.view = 'identity';
      render();
    } else if (action === 'compare-peer') {
      state.selectedPeerEmail = target.dataset.email;
      state.view = 'compare';
      render();
    } else if (action === 'midpoint' || action === 'connection-line') {
      const [owner, peer, identityId] = target.dataset.key.split('|');
      state.selectedOwnerEmail = owner; state.selectedPeerEmail = peer; state.selectedIdentityId = identityId; state.view = 'compare';
      render();
    } else if (action === 'zoom-in') {
      state.graph.scale = Math.min(2.2, state.graph.scale + .2); setGraphTransform();
    } else if (action === 'zoom-out') {
      state.graph.scale = Math.max(.65, state.graph.scale - .2); setGraphTransform();
    } else if (action === 'reset-graph') {
      state.graph = { scale: 1, x: 0, y: 0 }; setGraphTransform();
    } else if (action === 'show-all') {
      state.filter = 'all'; state.matchMode = 'both'; state.placementMode = 'all'; state.graphFocusEmail = state.currentEmail; state.graphIdentityFocus = null; state.graph = { scale: 1, x: 0, y: 0 }; render(false);
    }
  });

  function toggleDeepArray(field, value, max) {
    const identity = state.draft.identities.find(item => item.id === state.draft.deepenedIds[state.deepIndex]);
    identity.deeper ||= { values: [], priority: '', roles: [], access: '' };
    const list = identity.deeper[field];
    if (list.includes(value)) identity.deeper[field] = list.filter(item => item !== value);
    else if (list.length < max) identity.deeper[field] = [...list, value];
    render(false);
  }

  app.addEventListener('keydown', event => {
    const target = event.target.closest('[role="button"]');
    if (target && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      target.click();
    }
  });

  app.addEventListener('pointerdown', event => {
    const stage = event.target.closest('[data-graph-stage]');
    if (!stage) return;
    stage.setPointerCapture?.(event.pointerId);
    state.graphPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    state.graphMoved = false;
    stage.classList.add('dragging');
  });

  app.addEventListener('pointermove', event => {
    const stage = event.target.closest('[data-graph-stage]');
    if (!stage || !state.graphPointers.has(event.pointerId)) return;
    const previous = state.graphPointers.get(event.pointerId);
    if (state.graphPointers.size === 1) {
      const svg = stage.querySelector('svg');
      const ratio = (svg?.viewBox?.baseVal?.width || stage.clientWidth) / stage.clientWidth;
      const dx = (event.clientX - previous.x) * ratio;
      const dy = (event.clientY - previous.y) * ratio;
      if (Math.abs(dx) + Math.abs(dy) > 1) state.graphMoved = true;
      state.graph.x += dx;
      state.graph.y += dy;
    } else if (state.graphPointers.size === 2) {
      const points = [...state.graphPointers.entries()];
      const other = points.find(([id]) => id !== event.pointerId)?.[1];
      if (other) {
        const oldDistance = Math.hypot(previous.x - other.x, previous.y - other.y);
        const newDistance = Math.hypot(event.clientX - other.x, event.clientY - other.y);
        if (oldDistance > 0) state.graph.scale = Math.max(.65, Math.min(2.2, state.graph.scale * (newDistance / oldDistance)));
        state.graphMoved = true;
      }
    }
    state.graphPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    setGraphTransform();
  });

  function endPointer(event) {
    const stage = event.target.closest?.('[data-graph-stage]') || document.querySelector('[data-graph-stage]');
    state.graphPointers.delete(event.pointerId);
    if (!state.graphPointers.size) stage?.classList.remove('dragging');
  }
  app.addEventListener('pointerup', endPointer);
  app.addEventListener('pointercancel', endPointer);

  app.addEventListener('wheel', event => {
    const stage = event.target.closest('[data-graph-stage]');
    if (!stage) return;
    event.preventDefault();
    state.graph.scale = Math.max(.65, Math.min(2.2, state.graph.scale + (event.deltaY < 0 ? .12 : -.12)));
    setGraphTransform();
  }, { passive: false });

  window.addEventListener('resize', () => {
    if (state.view === 'web') render(false);
  });

  render();
})();
