// ===== Booking form popup → WhatsApp =====
// Uses WA_NUMBER from main.js (load this file after main.js)
(() => {
  // ---------- Data ----------
  const STATES = {
    'Andhra Pradesh': ['Anantapur', 'Eluru', 'Guntur', 'Kadapa', 'Kakinada', 'Kurnool', 'Nellore', 'Ongole', 'Rajahmundry', 'Tirupati', 'Vijayawada', 'Visakhapatnam'],
    'Arunachal Pradesh': ['Bomdila', 'Itanagar', 'Naharlagun', 'Pasighat', 'Roing', 'Tawang', 'Tezu', 'Ziro'],
    'Assam': ['Bongaigaon', 'Dhubri', 'Dibrugarh', 'Diphu', 'Goalpara', 'Guwahati', 'Jorhat', 'Nagaon', 'Silchar', 'Sivasagar', 'Tezpur', 'Tinsukia'],
    'Bihar': ['Arrah', 'Begusarai', 'Bhagalpur', 'Chapra', 'Darbhanga', 'Gaya', 'Hajipur', 'Katihar', 'Munger', 'Muzaffarpur', 'Patna', 'Purnia'],
    'Chhattisgarh': ['Ambikapur', 'Bhilai', 'Bilaspur', 'Durg', 'Jagdalpur', 'Korba', 'Raigarh', 'Raipur', 'Rajnandgaon'],
    'Goa': ['Bicholim', 'Mapusa', 'Margao', 'Panaji', 'Ponda', 'Vasco da Gama'],
    'Gujarat': ['Ahmedabad', 'Anand', 'Bharuch', 'Bhavnagar', 'Gandhinagar', 'Jamnagar', 'Junagadh', 'Morbi', 'Navsari', 'Rajkot', 'Surat', 'Vadodara', 'Vapi'],
    'Haryana': ['Ambala', 'Faridabad', 'Gurugram', 'Hisar', 'Karnal', 'Kurukshetra', 'Panchkula', 'Panipat', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar'],
    'Himachal Pradesh': ['Bilaspur', 'Chamba', 'Dharamshala', 'Hamirpur', 'Kullu', 'Manali', 'Mandi', 'Shimla', 'Solan', 'Una'],
    'Jharkhand': ['Bokaro', 'Deoghar', 'Dhanbad', 'Dumka', 'Giridih', 'Hazaribagh', 'Jamshedpur', 'Ramgarh', 'Ranchi'],
    'Karnataka': ['Ballari', 'Belagavi', 'Bengaluru', 'Davanagere', 'Dharwad', 'Hubballi', 'Kalaburagi', 'Mangaluru', 'Mysuru', 'Shivamogga', 'Tumakuru', 'Udupi'],
    'Kerala': ['Alappuzha', 'Kannur', 'Kochi', 'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Thiruvananthapuram', 'Thrissur'],
    'Madhya Pradesh': ['Bhopal', 'Dewas', 'Gwalior', 'Indore', 'Jabalpur', 'Ratlam', 'Rewa', 'Sagar', 'Satna', 'Ujjain'],
    'Maharashtra': ['Amravati', 'Chhatrapati Sambhajinagar', 'Kolhapur', 'Mumbai', 'Nagpur', 'Nanded', 'Nashik', 'Navi Mumbai', 'Pune', 'Sangli', 'Solapur', 'Thane'],
    'Manipur': ['Bishnupur', 'Churachandpur', 'Imphal', 'Kakching', 'Thoubal', 'Ukhrul'],
    'Meghalaya': ['Baghmara', 'Jowai', 'Nongstoin', 'Shillong', 'Tura', 'Williamnagar'],
    'Mizoram': ['Aizawl', 'Champhai', 'Kolasib', 'Lunglei', 'Saiha', 'Serchhip'],
    'Nagaland': ['Dimapur', 'Kohima', 'Mokokchung', 'Mon', 'Tuensang', 'Wokha', 'Zunheboto'],
    'Odisha': ['Balasore', 'Baripada', 'Berhampur', 'Bhadrak', 'Bhubaneswar', 'Cuttack', 'Jharsuguda', 'Puri', 'Rourkela', 'Sambalpur'],
    'Punjab': ['Amritsar', 'Bathinda', 'Hoshiarpur', 'Jalandhar', 'Ludhiana', 'Moga', 'Mohali', 'Pathankot', 'Patiala', 'Phagwara'],
    'Rajasthan': ['Ajmer', 'Alwar', 'Bharatpur', 'Bhilwara', 'Bikaner', 'Jaipur', 'Jodhpur', 'Kota', 'Sikar', 'Sri Ganganagar', 'Udaipur'],
    'Sikkim': ['Gangtok', 'Gyalshing', 'Jorethang', 'Mangan', 'Namchi', 'Pakyong', 'Rangpo', 'Ravangla', 'Singtam', 'Soreng'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Erode', 'Hosur', 'Madurai', 'Salem', 'Thanjavur', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tiruppur', 'Vellore'],
    'Telangana': ['Adilabad', 'Hyderabad', 'Karimnagar', 'Khammam', 'Mahbubnagar', 'Nalgonda', 'Nizamabad', 'Ramagundam', 'Siddipet', 'Warangal'],
    'Tripura': ['Agartala', 'Ambassa', 'Belonia', 'Dharmanagar', 'Kailasahar', 'Udaipur'],
    'Uttar Pradesh': ['Agra', 'Aligarh', 'Ayodhya', 'Bareilly', 'Ghaziabad', 'Gorakhpur', 'Greater Noida', 'Jhansi', 'Kanpur', 'Lucknow', 'Meerut', 'Moradabad', 'Noida', 'Prayagraj', 'Varanasi'],
    'Uttarakhand': ['Almora', 'Dehradun', 'Haldwani', 'Haridwar', 'Kashipur', 'Mussoorie', 'Nainital', 'Rishikesh', 'Roorkee', 'Rudrapur'],
    'West Bengal': ['Asansol', 'Barasat', 'Bardhaman', 'Bolpur', 'Cooch Behar', 'Darjeeling', 'Durgapur', 'Haldia', 'Howrah', 'Jalpaiguri', 'Kalimpong', 'Kharagpur', 'Kolkata', 'Krishnanagar', 'Malda', 'Siliguri']
  };
  const UTS = {
    'Andaman and Nicobar Islands': ['Car Nicobar', 'Diglipur', 'Mayabunder', 'Port Blair', 'Rangat'],
    'Chandigarh': ['Chandigarh'],
    'Dadra and Nagar Haveli and Daman and Diu': ['Daman', 'Diu', 'Silvassa'],
    'Delhi': ['Central Delhi', 'Dwarka', 'East Delhi', 'New Delhi', 'North Delhi', 'Rohini', 'South Delhi', 'West Delhi'],
    'Jammu and Kashmir': ['Anantnag', 'Baramulla', 'Jammu', 'Kathua', 'Pulwama', 'Sopore', 'Srinagar', 'Udhampur'],
    'Ladakh': ['Kargil', 'Leh'],
    'Lakshadweep': ['Agatti', 'Amini', 'Kavaratti', 'Minicoy'],
    'Puducherry': ['Karaikal', 'Mahe', 'Puducherry', 'Yanam']
  };
  const CITIES = { ...STATES, ...UTS };

  // Profession → how it reads in the message ("I am Riya Das, a ___ from ...")
  const PROFESSIONS = {
    'Public Sector': 'public sector employee',
    'Private Sector': 'private sector employee',
    'Housewife': 'housewife',
    'Freelancer': 'freelancer',
    'Student': 'student',
    'Non-worker': 'non-working individual'
  };
  const GOALS = {
    'Lose weight': 'lose weight',
    'Gain weight': 'gain weight',
    'Stay healthy': 'stay healthy',
    'Improve lifestyle': 'improve my lifestyle'
  };
  const AGE_MIN = 10, AGE_MAX = 99;

  // ---------- Markup ----------
  const opt = list => list.map(v => `<option value="${v}">${v}</option>`).join('');
  const html = `
  <div class="book" id="book" role="dialog" aria-modal="true" aria-labelledby="book-title" hidden>
    <div class="book__overlay" data-book-close></div>
    <div class="book__panel">
      <button type="button" class="book__close" aria-label="Close" data-book-close>&times;</button>
      <p class="eyebrow">Free Consultation</p>
      <h2 id="book-title">Book Your Free Call</h2>
      <p class="book__intro">Share a few details and we'll continue on WhatsApp.</p>

      <form class="book__form" novalidate>
        <div class="book__row">
          <label>First name<input name="first" type="text" maxlength="40" autocomplete="given-name" required></label>
          <label>Last name<input name="last" type="text" maxlength="40" autocomplete="family-name" required></label>
        </div>
        <div class="book__row">
          <label>State
            <select name="state" required>
              <option value="">Select state</option>
              <optgroup label="States">${opt(Object.keys(STATES))}</optgroup>
              <optgroup label="Union Territories">${opt(Object.keys(UTS))}</optgroup>
            </select>
          </label>
          <label>City
            <select name="city" required disabled><option value="">Select state first</option></select>
          </label>
        </div>
        <label class="book__other-city" hidden>Your city<input name="cityOther" type="text" maxlength="40"></label>
        <div class="book__row">
          <label>Age
            <input name="age" type="text" inputmode="numeric" maxlength="2" placeholder="e.g. 32" required>
            <small class="book__err" hidden>Please enter an age between ${AGE_MIN} and ${AGE_MAX}</small>
          </label>
          <label>Profession
            <select name="profession" required>
              <option value="">Select profession</option>${opt(Object.keys(PROFESSIONS))}
            </select>
          </label>
        </div>

        <fieldset class="book__goals">
          <legend>Fitness goal <span>(choose one or more)</span></legend>
          ${Object.keys(GOALS).map(g => `<label class="chk"><input type="checkbox" name="goal" value="${g}"><span>${g}</span></label>`).join('')}
          <label class="chk"><input type="checkbox" name="goalOther"><span>Others</span></label>
          <div class="book__other" hidden>
            <textarea name="otherText" maxlength="300" rows="3" placeholder="Tell us your goal"></textarea>
            <small class="book__count">0 / 300</small>
          </div>
        </fieldset>

        <button type="submit" class="btn btn--solid book__submit" disabled>Book Now</button>
        <p class="book__hint">Kindly fill all details</p>
      </form>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', html);

  const modal = document.getElementById('book');
  const form = modal.querySelector('form');
  const f = form.elements;
  const submit = form.querySelector('.book__submit');
  const hint = form.querySelector('.book__hint');
  const otherBox = form.querySelector('.book__other');
  const otherCity = form.querySelector('.book__other-city');
  const ageErr = form.querySelector('.book__err');
  const counter = form.querySelector('.book__count');
  let lastFocus = null;

  // ---------- Behaviour ----------
  f.state.addEventListener('change', () => {
    const list = CITIES[f.state.value] || [];
    f.city.innerHTML = list.length
      ? `<option value="">Select city</option>${opt(list)}<option value="__other">Other (type your city)</option>`
      : '<option value="">Select state first</option>';
    f.city.disabled = !list.length;
    otherCity.hidden = true;
    f.cityOther.value = '';
  });
  f.city.addEventListener('change', () => {
    otherCity.hidden = f.city.value !== '__other';
    if (!otherCity.hidden) f.cityOther.focus();
  });

  f.age.addEventListener('input', () => { f.age.value = f.age.value.replace(/\D/g, '').slice(0, 2); ageErr.hidden = true; });
  f.age.addEventListener('blur', () => { ageErr.hidden = !f.age.value || ageOk(); });

  f.goalOther.addEventListener('change', () => {
    otherBox.hidden = !f.goalOther.checked;
    if (f.goalOther.checked) f.otherText.focus();
  });
  f.otherText.addEventListener('input', () => { counter.textContent = `${f.otherText.value.length} / 300`; });

  const ageOk = () => { const a = +f.age.value; return a >= AGE_MIN && a <= AGE_MAX; };
  const cityValue = () => f.city.value === '__other' ? f.cityOther.value.trim() : f.city.value;
  const goalsChosen = () => [...form.querySelectorAll('input[name="goal"]:checked')].map(c => GOALS[c.value]);

  const isValid = () =>
    f.first.value.trim() && f.last.value.trim() &&
    f.state.value && cityValue() &&
    ageOk() && f.profession.value &&
    (goalsChosen().length || f.goalOther.checked) &&
    (!f.goalOther.checked || f.otherText.value.trim());

  const refresh = () => {
    const ok = !!isValid();
    submit.disabled = !ok;
    hint.hidden = ok;
  };
  form.addEventListener('input', refresh);
  form.addEventListener('change', refresh);

  const cap = s => s.trim().replace(/\s+/g, ' ').replace(/(^|[\s-])\S/g, m => m.toUpperCase());
  const joinList = arr => arr.length < 2 ? arr.join('') : `${arr.slice(0, -1).join(', ')} and ${arr[arr.length - 1]}`;

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!isValid()) return;
    const goals = goalsChosen();
    if (f.goalOther.checked) goals.push(f.otherText.value.trim().replace(/[.!]+$/, ''));
    const msg = `Hi Maitrayee, I am ${cap(f.first.value)} ${cap(f.last.value)}, a ${PROFESSIONS[f.profession.value]} from ${cap(cityValue())}, ${f.state.value}. ` +
      `I am ${+f.age.value} years old and I want to ${joinList(goals)}. ` +
      `Could you please schedule a call with me based on your availability to discuss further? Thanks!`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
    close();
  });

  // ---------- Open / close ----------
  const focusables = () => [...modal.querySelectorAll('button, input, select, textarea')].filter(el => !el.disabled && el.offsetParent !== null);
  const open = () => {
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('book-open');
    requestAnimationFrame(() => modal.classList.add('is-open'));
    setTimeout(() => f.first.focus(), 150);
    refresh();
  };
  const close = () => {
    modal.classList.remove('is-open');
    document.body.classList.remove('book-open');
    setTimeout(() => { modal.hidden = true; }, 300);
    if (lastFocus) lastFocus.focus();
  };

  document.querySelectorAll('[data-book]').forEach(btn => btn.addEventListener('click', e => {
    e.preventDefault();
    open();
  }));
  modal.querySelectorAll('[data-book-close]').forEach(el => el.addEventListener('click', close));
  document.addEventListener('keydown', e => {
    if (modal.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'Tab') {
      const els = focusables(), first = els[0], last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
})();
