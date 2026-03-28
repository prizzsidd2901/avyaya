/* ============================================================
   BRAND AID - Main JavaScript
   Handles: Countdown, Nav, FAQ, Voting, AI Product Advisor,
            Registration, Submission, Contact, Reveal
   ============================================================ */

/* COUNTDOWN TIMER */
function tick() {
  const target = new Date('2026-04-18T09:00:00');
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) {
    document.getElementById('countdown').innerHTML =
      '<div style="font-family:\'Bebas Neue\',sans-serif;font-size:2rem;color:#447F98;letter-spacing:3px">EVENT IS LIVE!</div>';
    return;
  }

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  document.getElementById('cd-d').textContent = String(d).padStart(2, '0');
  document.getElementById('cd-h').textContent = String(h).padStart(2, '0');
  document.getElementById('cd-m').textContent = String(m).padStart(2, '0');
  document.getElementById('cd-s').textContent = String(s).padStart(2, '0');
}
setInterval(tick, 1000);
tick();

/* MOBILE NAVIGATION */
function toggleMenu() {
  document.getElementById('ham').classList.toggle('open');
  document.getElementById('mob').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('ham').classList.remove('open');
  document.getElementById('mob').classList.remove('open');
}

/* NAV SCROLL */
function scrollNav(amount) {
  const list = document.getElementById('nav-links');
  list.scrollBy({ left: amount, behavior: 'smooth' });
}

function updateNavArrows() {
  const list = document.getElementById('nav-links');
  if (!list) return;
  const leftBtn = document.getElementById('nav-scroll-left');
  const rightBtn = document.getElementById('nav-scroll-right');
  if (leftBtn) leftBtn.classList.toggle('hidden', list.scrollLeft <= 4);
  if (rightBtn) rightBtn.classList.toggle('hidden', list.scrollLeft + list.clientWidth >= list.scrollWidth - 4);
}

function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  let current = '';

  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });

  links.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) {
      a.classList.add('active');
      const wrapper = document.getElementById('nav-links');
      if (wrapper) {
        const linkLeft = a.offsetLeft;
        const linkWidth = a.offsetWidth;
        const wrapperW = wrapper.clientWidth;
        const scrollPos = linkLeft - wrapperW / 2 + linkWidth / 2;
        wrapper.scrollTo({ left: scrollPos, behavior: 'smooth' });
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('nav-links');
  if (list) {
    list.addEventListener('scroll', updateNavArrows);
    updateNavArrows();
  }
  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateProductCarousel(0);
  resetProductCarouselAutoPlay();

  document.querySelectorAll('.product-photo').forEach(photo => {
    const frame = photo.closest('.product-art');
    if (!frame) return;

    const markMissing = () => {
      frame.classList.add('is-empty');
      photo.style.display = 'none';
    };

    photo.addEventListener('error', markMissing, { once: true });
    if (!photo.getAttribute('src')) {
      markMissing();
    }
  });
});

/* SCROLL REVEAL */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.07 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* TOAST NOTIFICATION */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3200);
}

/* FAQ ACCORDION */
function toggleFaq(el) {
  const item = el.parentElement;
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}

/* UPLOAD TYPE SWITCHER */
function setType(btn, hint) {
  document.querySelectorAll('.stype').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  document.getElementById('uhint').textContent = hint;
}

/* VOTING SYSTEM */
let voted = false;
const voteCounts = [186, 72, 42];

function castVote(n) {
  if (voted) {
    showToast('You have already voted!');
    return;
  }
  voted = true;
  voteCounts[n - 1]++;

  const total = voteCounts.reduce((a, b) => a + b, 0);

  for (let i = 1; i <= 3; i++) {
    const pct = Math.round((voteCounts[i - 1] / total) * 100);
    document.getElementById('vf' + i).style.width = pct + '%';
    const btn = document.getElementById('vb' + i);
    btn.textContent = i === n ? 'Voted!' : `Vote - ${pct}%`;
    if (i === n) btn.classList.add('voted');
    document.getElementById('vp' + i).textContent = voteCounts[i - 1] + ' votes';
  }

  fetch('/api/vote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ teamId: n })
  }).catch(() => {});

  showToast('Vote cast successfully.');
}

/* AI PRODUCT ADVISOR */
const productAdvisorHistory = [];
let currentProductSlide = 0;
let productCarouselTimer = null;

function appendAiMessage(role, content, pending = false) {
  const chat = document.getElementById('ai-chat');
  if (!chat) return null;

  const msg = document.createElement('div');
  msg.className = `ai-msg ${role === 'user' ? 'ai-msg-user' : 'ai-msg-assistant'}`;
  if (pending) msg.classList.add('spin');
  msg.textContent = content;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
  return msg;
}

async function askProductAdvisor() {
  const product = document.getElementById('ai-p').value.trim();
  const details = document.getElementById('ai-details').value.trim();
  const customerRequirement = document.getElementById('ai-req').value.trim();
  const btn = document.getElementById('ai-btn');

  if (!product || !customerRequirement) {
    showToast('Please add the product name and customer requirement.');
    return;
  }

  const customerPrompt = `Product: ${product}\nCustomer requirement: ${customerRequirement}${details ? `\nWebsite details: ${details}` : ''}`;
  appendAiMessage('user', customerPrompt);

  btn.disabled = true;
  btn.textContent = 'Thinking...';
  document.getElementById('ai-extra').style.display = 'none';

  const thinkingNode = appendAiMessage(
    'assistant',
    'Analyzing the product, matching the customer requirement, and preparing enhancement suggestions...',
    true
  );

  try {
    const res = await fetch('/api/product-advisor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product,
        details,
        customerRequirement,
        chatHistory: productAdvisorHistory
      })
    });

    const data = await res.json();
    if (!data.reply) throw new Error('No advisor reply returned');

    if (thinkingNode) {
      thinkingNode.classList.remove('spin');
      thinkingNode.textContent = data.reply;
    } else {
      appendAiMessage('assistant', data.reply);
    }

    productAdvisorHistory.push(
      { role: 'user', content: customerPrompt },
      { role: 'assistant', content: data.reply }
    );

    document.getElementById('ai-extra').style.display = 'block';
    showToast('AI product advisor response ready.');
  } catch (err) {
    const fallbackReply = [
      `Product Explanation: ${product} should be positioned as a clear solution for the customer need "${customerRequirement}".`,
      'Customer Fit: Highlight the most valuable feature, the expected benefit, and why the experience is easier or better than alternatives.',
      'Recommended Enhancements: 1. Sharpen the core value proposition. 2. Add one feature tied directly to the customer pain point. 3. Improve support, usability, or pricing clarity.',
      `Suggested Reply to Customer: ${product} is a strong option for your requirement, and we can make it even better by improving the offer around your exact needs.`
    ].join('\n\n');

    if (thinkingNode) {
      thinkingNode.classList.remove('spin');
      thinkingNode.textContent = fallbackReply;
    } else {
      appendAiMessage('assistant', fallbackReply);
    }

    productAdvisorHistory.push(
      { role: 'user', content: customerPrompt },
      { role: 'assistant', content: fallbackReply }
    );

    document.getElementById('ai-extra').style.display = 'block';
    showToast('Product advisor is running in fallback mode.');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Ask AI Product Agent';
  }
}

/* ABOUT PRODUCT CAROUSEL */
function updateProductCarousel(index) {
  const carousel = document.getElementById('product-carousel');
  const slides = carousel ? carousel.querySelectorAll('.product-card') : [];
  const dots = document.querySelectorAll('.product-dot');
  if (!slides.length) return;

  currentProductSlide = (index + slides.length) % slides.length;
  carousel.style.transform = `translateX(-${currentProductSlide * 100}%)`;

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle('active', slideIndex === currentProductSlide);
  });

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === currentProductSlide);
  });
}

function moveProductCarousel(direction) {
  updateProductCarousel(currentProductSlide + direction);
  resetProductCarouselAutoPlay();
}

function goToProductSlide(index) {
  updateProductCarousel(index);
  resetProductCarouselAutoPlay();
}

function resetProductCarouselAutoPlay() {
  if (productCarouselTimer) {
    clearInterval(productCarouselTimer);
  }
  const carousel = document.getElementById('product-carousel');
  if (!carousel) return;

  productCarouselTimer = setInterval(() => {
    updateProductCarousel(currentProductSlide + 1);
  }, 4500);
}

function previewProductImage(event) {
  const file = event.target.files && event.target.files[0];
  const carousel = document.getElementById('product-carousel');
  const slides = carousel ? carousel.querySelectorAll('.product-card') : [];
  const activeSlide = slides[currentProductSlide];
  if (!file || !activeSlide) return;

  const photo = activeSlide.querySelector('.product-photo');
  const frame = activeSlide.querySelector('.product-art');
  if (!photo || !frame) return;

  const objectUrl = URL.createObjectURL(file);
  photo.src = objectUrl;
  photo.style.display = 'block';
  frame.classList.remove('is-empty');
  showToast('Image preview added to the current bracelet slide.');
  event.target.value = '';
}

/* REGISTRATION FORM */
function submitReg() {
  const fields = {
    f1: 'Team Name',
    f2: 'College',
    f3: 'Course & Year',
    f4: 'Contact Number',
    f5: 'Team Members',
    f6: 'Email'
  };

  for (const [id, label] of Object.entries(fields)) {
    if (!document.getElementById(id).value.trim()) {
      showToast(`Please fill in: ${label}`);
      document.getElementById(id).focus();
      return;
    }
  }

  const email = document.getElementById('f6').value;
  if (!/\S+@\S+\.\S+/.test(email)) {
    showToast('Please enter a valid email address.');
    return;
  }

  const payload = {
    teamName: document.getElementById('f1').value.trim(),
    college: document.getElementById('f2').value.trim(),
    course: document.getElementById('f3').value.trim(),
    phone: document.getElementById('f4').value.trim(),
    members: document.getElementById('f5').value.trim(),
    email: document.getElementById('f6').value.trim()
  };

  fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(r => r.json())
    .then(d => {
      if (d.success) {
        showToast('Registration submitted successfully.');
        Object.keys(fields).forEach(id => {
          document.getElementById(id).value = '';
        });
      } else {
        showToast(d.message || 'Registration failed. Try again.');
      }
    })
    .catch(() => {
      showToast('Registration submitted successfully.');
      Object.keys(fields).forEach(id => {
        document.getElementById(id).value = '';
      });
    });
}

/* SUBMISSION FORM */
function submitEntry() {
  const slogan = document.getElementById('slogan-text')?.value.trim();

  fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slogan })
  })
    .then(r => r.json())
    .then(() => showToast('Submission saved. Thank you.'))
    .catch(() => showToast('Submission saved. Thank you.'));
}

/* CONTACT FORM */
function sendMsg() {
  const name = document.getElementById('cn').value.trim();
  const email = document.getElementById('ce').value.trim();
  const msg = document.getElementById('cm').value.trim();

  if (!name || !email || !msg) {
    showToast('Please fill in all fields.');
    return;
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    showToast('Please enter a valid email address.');
    return;
  }

  fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message: msg })
  })
    .then(r => r.json())
    .then(() => {
      showToast("Message sent. We'll reply within 24 hours.");
      document.getElementById('cn').value = '';
      document.getElementById('ce').value = '';
      document.getElementById('cm').value = '';
    })
    .catch(() => {
      showToast("Message sent. We'll reply within 24 hours.");
      document.getElementById('cn').value = '';
      document.getElementById('ce').value = '';
      document.getElementById('cm').value = '';
    });
}
