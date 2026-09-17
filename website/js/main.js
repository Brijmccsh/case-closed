/* Case Closed — marketing site interactions (vanilla JS, no dependencies) */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------
     Nav: scrolled state + mobile menu
     ------------------------------------------------------------------ */
  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var menu = document.getElementById('nav-menu');

  function onScroll() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 12);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  function setMenu(open) {
    if (!nav || !burger) return;
    nav.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  if (burger && menu) {
    burger.addEventListener('click', function () {
      setMenu(!nav.classList.contains('open'));
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        setMenu(false);
        burger.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('open') && !nav.contains(e.target)) setMenu(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 900 && nav.classList.contains('open')) setMenu(false);
    });
  }

  /* ------------------------------------------------------------------
     Reveal on scroll
     ------------------------------------------------------------------ */
  var revealEls = document.querySelectorAll('.reveal');
  if (!reduceMotion && 'IntersectionObserver' in window && revealEls.length) {
    document.documentElement.classList.add('js-reveal');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealEls.forEach(function (el) {
      // Anything already on screen shows immediately (no flash)
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-visible');
      else io.observe(el);
    });
  }

  /* ------------------------------------------------------------------
     FAQ accordion
     ------------------------------------------------------------------ */
  document.querySelectorAll('.acc-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      if (panel) panel.hidden = expanded;
    });
  });

  /* ------------------------------------------------------------------
     Try-a-case demo
     ------------------------------------------------------------------ */
  var CASES = {
    tinker: {
      title: 'Tinker v. Des Moines Independent Community School District',
      court: 'Supreme Court',
      year: '1969',
      vote: '7–2',
      topic: 'School Speech',
      tagClass: 'tag-speech',
      tldr: 'Students wore black armbands to school to protest the Vietnam War, and they were suspended. The Court ruled for the students: schools can’t restrict student [[expression]] unless it would [[substantially disrupt]] school or invade others’ rights.',
      means: 'You don’t lose your right to free expression when you walk into school. Your school can limit it if it would substantially disrupt school or invade other people’s rights.',
      quote: 'It can hardly be argued that either students or teachers shed their constitutional rights to freedom of speech or expression at the schoolhouse gate.',
      quoteCite: 'Tinker v. Des Moines (1969)',
      source: 'https://www.oyez.org/cases/1968/21',
      glossary: {
        'expression': 'Any way of sharing a message or idea: words, writing, art, clothing, or symbols like an armband.',
        'substantially disrupt': 'To seriously interfere with how a school runs or with classes happening. A small distraction is not the same thing.'
      },
      quiz: {
        q: 'According to the Court, when can a school restrict student expression?',
        options: [
          'Whenever school staff disagree with the message',
          'When it would substantially disrupt school or invade others’ rights',
          'Never. Students can express anything at school.'
        ],
        answer: 1,
        explain: 'The Court said schools can’t restrict student expression unless it would substantially disrupt school or invade others’ rights.'
      },
      poll: [64, 22, 14]
    },
    riley: {
      title: 'Riley v. California',
      court: 'Supreme Court',
      year: '2014',
      vote: '9–0',
      topic: 'Digital Privacy',
      tagClass: 'tag-privacy',
      tldr: 'Police searched an arrested person’s smartphone without a [[warrant]]. The Court ruled that police generally need a warrant to search the [[digital contents]] of a cell phone seized during an arrest.',
      means: 'If you are ever arrested, police generally can’t look through the data on your phone just because they took it. They generally need a warrant first.',
      quote: 'Our answer to the question of what police must do before searching a cell phone seized incident to an arrest is accordingly simple—get a warrant.',
      quoteCite: 'Chief Justice Roberts, Riley v. California (2014)',
      source: 'https://www.oyez.org/cases/2013/13-132',
      glossary: {
        'warrant': 'A document signed by a judge that gives police permission to do a specific search.',
        'digital contents': 'The information stored on a phone, such as messages, photos, contacts, and app data.'
      },
      quiz: {
        q: 'What do police generally need before searching the digital contents of a phone seized during an arrest?',
        options: [
          'Nothing. The arrest itself is enough.',
          'A warrant',
          'Only the phone’s passcode'
        ],
        answer: 1,
        explain: 'The Court ruled that police generally need a warrant to search the digital contents of a cell phone seized during an arrest.'
      },
      poll: [71, 16, 13]
    },
    mahanoy: {
      title: 'Mahanoy Area School District v. B.L.',
      court: 'Supreme Court',
      year: '2021',
      vote: '8–1',
      topic: 'School Speech',
      tagClass: 'tag-speech',
      tldr: 'A high-school student who didn’t make the varsity cheer team posted a profane Snapchat story on a weekend, off campus. Her school suspended her from JV cheer. The Court ruled the school violated her [[First Amendment]] rights.',
      means: 'Your school has less power over what you say off campus. Schools can still regulate some [[off-campus speech]], like bullying or threats, but their power is weaker there.',
      quote: null,
      source: 'https://www.oyez.org/cases/2020/20-255',
      glossary: {
        'First Amendment': 'The part of the U.S. Constitution that protects freedom of speech, religion, and the press, plus the rights to gather peacefully and to petition the government.',
        'off-campus speech': 'Things you say or post away from school grounds and outside school activities, like a post made from home on a weekend.'
      },
      quiz: {
        q: 'What did the Court decide about the school’s punishment?',
        options: [
          'The school acted within its power because she was on a school team',
          'The school violated her First Amendment rights',
          'Schools can never regulate anything students say off campus'
        ],
        answer: 1,
        explain: 'The Court ruled the school violated her First Amendment rights, though schools can still regulate some off-campus speech like bullying or threats.'
      },
      poll: [58, 27, 15]
    }
  };

  var POLL_LABELS = ['Yes', 'No', 'Not sure'];
  var LETTERS = ['A', 'B', 'C'];

  var chips = document.querySelectorAll('.chip[data-case]');
  var demoCard = document.getElementById('demo-card');
  var demoBody = document.getElementById('demo-body');
  var demoEmpty = document.getElementById('demo-empty');
  var openPopover = null;
  var uid = 0;

  function esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Turn [[term]] markers into glossary buttons
  function withTerms(text, glossary) {
    return esc(text).replace(/\[\[(.+?)\]\]/g, function (_, term) {
      if (!glossary[term]) return term;
      return '<button type="button" class="term" data-term="' + term + '" aria-expanded="false" aria-haspopup="dialog">' + term + '</button>';
    });
  }

  function el(tag, cls, html) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (html != null) node.innerHTML = html;
    return node;
  }

  function closePopover(returnFocus) {
    if (!openPopover) return;
    var trigger = openPopover.trigger;
    openPopover.node.remove();
    trigger.setAttribute('aria-expanded', 'false');
    trigger.removeAttribute('aria-controls');
    if (returnFocus) trigger.focus();
    openPopover = null;
  }

  function showPopover(trigger, term, definition) {
    var same = openPopover && openPopover.trigger === trigger;
    closePopover(false);
    if (same) return;

    var id = 'pop-' + (++uid);
    var pop = el('div', 'popover');
    pop.id = id;
    pop.setAttribute('role', 'dialog');
    pop.setAttribute('aria-label', 'Definition: ' + term);
    pop.innerHTML =
      '<button type="button" class="pop-close" aria-label="Close definition">&times;</button>' +
      '<h4>' + esc(term) + '</h4><p>' + esc(definition) + '</p>';
    demoCard.appendChild(pop);

    // Position below the term, clamped within the card
    var cardRect = demoCard.getBoundingClientRect();
    var tRect = trigger.getClientRects()[0] || trigger.getBoundingClientRect();
    var popW = pop.offsetWidth;
    var pad = 16;
    var left = tRect.left - cardRect.left;
    left = Math.max(pad, Math.min(left, cardRect.width - popW - pad));
    pop.style.left = left + 'px';
    pop.style.top = (tRect.bottom - cardRect.top + 8) + 'px';

    trigger.setAttribute('aria-expanded', 'true');
    trigger.setAttribute('aria-controls', id);
    pop.querySelector('.pop-close').addEventListener('click', function () { closePopover(true); });
    openPopover = { node: pop, trigger: trigger };
  }

  document.addEventListener('click', function (e) {
    if (!openPopover) return;
    if (openPopover.node.contains(e.target) || e.target.closest('.term')) return;
    closePopover(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && openPopover) closePopover(true);
  });
  window.addEventListener('resize', function () { closePopover(false); });

  function renderCase(key) {
    var c = CASES[key];
    if (!c || !demoBody) return;
    closePopover(false);

    chips.forEach(function (chip) {
      chip.setAttribute('aria-pressed', chip.getAttribute('data-case') === key ? 'true' : 'false');
    });

    demoBody.innerHTML = '';
    // restart entrance animation
    demoBody.hidden = true;
    void demoBody.offsetWidth;
    demoEmpty.hidden = true;
    demoBody.hidden = false;

    // Header
    var head = el('div', 'demo-head');
    head.innerHTML =
      '<div class="stamp-row">' +
        '<span class="stamp-label">' + esc(c.court) + ' · ' + esc(c.year) + ' · ' + esc(c.vote) + '</span>' +
        '<span class="tag ' + c.tagClass + '">' + esc(c.topic) + '</span>' +
      '</div>' +
      '<h3 class="demo-title">' + esc(c.title) + '</h3>';
    demoBody.appendChild(head);

    // TL;DR
    var tldr = el('div', 'demo-block');
    tldr.innerHTML = '<p class="stamp-label block-label">TL;DR</p><p>' + withTerms(c.tldr, c.glossary) + '</p>';
    demoBody.appendChild(tldr);

    // What it means for you
    var means = el('div', 'demo-block');
    means.innerHTML = '<p class="stamp-label block-label">What it means for you</p><p>' + withTerms(c.means, c.glossary) + '</p>';
    demoBody.appendChild(means);

    // Quote + source
    var src = el('div', 'demo-block');
    var srcHtml = '';
    if (c.quote) {
      srcHtml += '<p class="stamp-label block-label">From the opinion</p>' +
        '<blockquote class="quote">“' + esc(c.quote) + '”<cite class="quote-cite">' + esc(c.quoteCite) + '</cite></blockquote>';
    }
    srcHtml += '<a class="source-link" href="' + c.source + '" target="_blank" rel="noopener">Read the original case on Oyez <span aria-hidden="true">&#8599;</span></a>';
    src.innerHTML = srcHtml;
    demoBody.appendChild(src);

    // Quiz
    var quiz = el('div', 'demo-block');
    var qId = 'quiz-q-' + key;
    var optsHtml = c.quiz.options.map(function (opt, i) {
      return '<button type="button" class="option" data-i="' + i + '"><span class="opt-letter" aria-hidden="true">' + LETTERS[i] + '</span><span>' + esc(opt) + '</span></button>';
    }).join('');
    quiz.innerHTML =
      '<p class="stamp-label block-label">Test yourself</p>' +
      '<p class="quiz-q" id="' + qId + '">' + esc(c.quiz.q) + '</p>' +
      '<div class="options" role="group" aria-labelledby="' + qId + '">' + optsHtml + '</div>';
    demoBody.appendChild(quiz);

    // Poll (revealed after answering)
    var pollBlock = el('div', 'demo-block');
    pollBlock.hidden = true;
    var pollBtns = POLL_LABELS.map(function (label, i) {
      return '<button type="button" class="poll-opt" data-i="' + i + '">' +
        '<span class="po-head"><span class="po-label">' + label + '</span><span class="po-pct" aria-hidden="true"></span></span>' +
        '<span class="po-track" aria-hidden="true"><span class="po-fill"></span></span>' +
      '</button>';
    }).join('');
    pollBlock.innerHTML =
      '<p class="stamp-label block-label">Cast your verdict</p>' +
      '<p class="quiz-q" id="poll-q-' + key + '">Would you have ruled the same way?</p>' +
      '<div class="poll" role="group" aria-labelledby="poll-q-' + key + '">' + pollBtns + '</div>' +
      '<p class="poll-note">Results appear after you vote.</p>';
    demoBody.appendChild(pollBlock);

    // Closing
    var closing = el('div', 'closing');
    closing.hidden = true;
    closing.innerHTML =
      '<div class="rubber-stamp" role="img" aria-label="Case closed">Case Closed</div>' +
      '<button type="button" class="btn btn-outline next-case">Try another case <span aria-hidden="true">&rarr;</span></button>';
    demoBody.appendChild(closing);

    // --- Wire up glossary terms
    demoBody.querySelectorAll('.term').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var term = btn.getAttribute('data-term');
        showPopover(btn, term, c.glossary[term]);
      });
    });

    // --- Quiz behavior
    var optionBtns = quiz.querySelectorAll('.option');
    optionBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var pick = Number(btn.getAttribute('data-i'));
        var right = pick === c.quiz.answer;
        optionBtns.forEach(function (b, i) {
          b.disabled = true;
          if (i === c.quiz.answer) b.classList.add('correct');
          else if (i === pick) b.classList.add('wrong');
          else b.classList.add('dim');
        });
        var fb = el('div', 'feedback ' + (right ? 'ok' : 'bad'));
        fb.setAttribute('role', 'status');
        fb.innerHTML = '<strong>' + (right ? 'Correct' : 'Not quite') + '</strong>' +
          esc(c.quiz.explain);
        quiz.appendChild(fb);
        pollBlock.hidden = false;
        pollBlock.style.animation = 'fadeUp .45s cubic-bezier(.2,.7,.2,1)';
      });
    });

    // --- Poll behavior
    var poll = pollBlock.querySelector('.poll');
    var pollOpts = pollBlock.querySelectorAll('.poll-opt');
    pollOpts.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var pick = Number(btn.getAttribute('data-i'));
        poll.classList.add('voted');
        pollOpts.forEach(function (b, i) {
          b.disabled = true;
          var pct = c.poll[i];
          b.querySelector('.po-pct').textContent = pct + '%';
          b.querySelector('.po-pct').removeAttribute('aria-hidden');
          if (i === pick) {
            b.classList.add('picked');
            b.querySelector('.po-label').insertAdjacentHTML('beforeend', '<span class="po-pick">Your vote</span>');
          }
          b.setAttribute('aria-label', POLL_LABELS[i] + ': ' + pct + ' percent' + (i === pick ? ', your vote' : ''));
        });
        // animate bars from 0
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            pollOpts.forEach(function (b, i) {
              b.querySelector('.po-fill').style.width = c.poll[i] + '%';
            });
          });
        });
        pollBlock.querySelector('.poll-note').textContent = 'Sample reader votes';

        setTimeout(function () {
          closing.hidden = false;
          var stamp = closing.querySelector('.rubber-stamp');
          stamp.classList.remove('animate');
          void stamp.offsetWidth;
          stamp.classList.add('animate');
        }, reduceMotion ? 0 : 700);
      });
    });

    // --- Next case
    closing.querySelector('.next-case').addEventListener('click', function () {
      var keys = Object.keys(CASES);
      var next = keys[(keys.indexOf(key) + 1) % keys.length];
      renderCase(next);
      var chip = document.querySelector('.chip[data-case="' + next + '"]');
      var shell = document.querySelector('.demo-shell');
      if (shell) shell.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      if (chip) chip.focus({ preventScroll: true });
    });
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      renderCase(chip.getAttribute('data-case'));
    });
  });
})();
