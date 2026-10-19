const roleData = [{
    name: 'The Sniper',
    tag: 'THE THREAT',
    accent: '#d49b82',
    shade: '#8b443448',
    icon: '⌖',
    stat: '1 PLAYER',
    skill: 'Precision',
    detail: 'One tower. One rifle. Eliminate every runner before time runs out. Your visible laser gives away where you’re aiming.',
    copy: 'You’re the one in the tower. Don’t miss. Everyone can see your laser.'
}, {
    name: 'Police Escort',
    tag: 'THE SHIELD',
    accent: '#82b7ce',
    shade: '#426e8548',
    icon: '▣',
    stat: '6 SHOTS BLOCKED',
    skill: 'Defense',
    detail: 'Lead the way with a shield that can block up to 6 sniper shots. Heavy armor gives you extra protection, but makes you slower.',
    copy: 'Your shield tanks 6 shots. Your friends will probably hide behind you.'
}, {
    name: 'The Medic',
    tag: 'THE LIFELINE',
    accent: '#add09e',
    shade: '#557f4648',
    icon: '✚',
    stat: 'SQUAD SUPPORT',
    skill: 'Revive',
    detail: 'Reach downed runners and bring them back into the round. A revived teammate returns with 25 health and reduced movement speed. Bleed-out timings are still being finalized.',
    copy: 'Pick people up before they bleed out. They kinda need you.'
}, {
    name: 'The Civilian',
    tag: 'THE DISTRACTION',
    accent: '#ddca77',
    shade: '#8d7e3548',
    icon: 'ϟ',
    stat: 'BUILT FOR SPEED',
    skill: 'Movement',
    detail: 'No weapon. No shield. Use speed, slides, cover, and a boost to distract the Sniper while your teammates make their move.',
    copy: 'No gun. No shield. Just run really fast and slide under stuff.'
}];
const roles = document.querySelector('.roles');
roleData.forEach((r, i) => {
    let b = document.createElement('button');
    b.className = 'role' + (!i ? ' selected' : '');
    b.style.cssText = `--accent:${r.accent};--shade:${r.shade};color:inherit;text-align:left;padding:0`;
    b.setAttribute('aria-pressed', !i);
    b.innerHTML = `<div class="role-art"><span class="role-no">0${i+1} / ROLE</span><div class="blockman"><div class="head"><span class="face">•‿•</span></div><div class="torso"></div><div class="arm"></div><div class="arm r"></div><div class="legs"></div><div class="prop">${r.icon}</div></div></div><div class="role-body"><div class="tag">${r.tag}</div><h3>${r.name}</h3><p>${r.copy}</p><div class="role-bottom"><span>${r.stat}</span><span>↗</span></div></div>`;
    b.onclick = () => {
        document.querySelectorAll('.role').forEach(e => {
            e.classList.remove('selected');
            e.setAttribute('aria-pressed', 'false')
        });
        b.classList.add('selected');
        b.setAttribute('aria-pressed', 'true');
        document.querySelector('#roleDetail').innerHTML = `${r.icon} <b>${r.name} briefing:</b> ${r.detail}`
    };
    roles.append(b)
});
let remaining = 180,
    interval;
const timer = document.querySelector('#timer'),
    timerBtn = document.querySelector('#timerBtn');
timerBtn.onclick = () => {
    if (interval) {
        clearInterval(interval);
        interval = null;
        remaining = 180;
        timer.textContent = '03:00';
        timerBtn.textContent = 'Try the countdown ▷';
        return
    }
    timerBtn.textContent = 'Reset countdown ↻';
    interval = setInterval(() => {
        remaining--;
        timer.textContent = String(Math.floor(remaining / 60)).padStart(2, '0') + ':' + String(remaining % 60).padStart(2, '0');
        if (!remaining) {
            clearInterval(interval);
            interval = null;
            timerBtn.textContent = 'Run it again ▷';
            remaining = 180
        }
    }, 1000)
};
const mods = [
    ['LOW GRAVITY', 'Jumping is easy. Getting back on the ground is the problem.'],
    ['DUCK & COVER', 'Explosive rubber ducks. Everywhere. The squeaking is the least of your problems.'],
    ['SIZE MATTERS', 'Giant sniper or tiny runners? The arena just got a whole new perspective.'],
    ['SPEED OVERLOAD', 'Blink and you’ll miss the runners. The sniper gets super aim to keep up.'],
    ['ZOMBIE RUSH', 'As if the sniper wasn’t enough. Now something else is chasing you.']
];
let mod = 0;
document.querySelector('#chaosBtn').onclick = () => {
    mod = (mod + 1) % mods.length;
    document.querySelector('#modTitle').textContent = mods[mod][0];
    document.querySelector('#modText').textContent = mods[mod][1];
    document.querySelector('#modNumber').textContent = `0${mod+1} / 05`;
    document.body.classList.add('chaos');
    setTimeout(() => document.body.classList.remove('chaos'), 650)
};
const modal = document.querySelector('#launchModal');
let previous;

function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
    previous?.focus()
}
document.querySelectorAll('.launch').forEach(b => b.onclick = () => {
    previous = b;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    modal.querySelector('.close').focus()
});
modal.querySelector('.close').onclick = closeModal;
modal.querySelector('.closeBtn').onclick = closeModal;
modal.onclick = e => {
    if (e.target === modal) closeModal()
};
document.addEventListener('keydown', e => {
    if (modal.hidden) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'Tab') {
        const f = modal.querySelectorAll('button');
        if (e.shiftKey && document.activeElement === f[0]) {
            e.preventDefault();
            f[1].focus()
        } else if (!e.shiftKey && document.activeElement === f[1]) {
            e.preventDefault();
            f[0].focus()
        }
    }
});