/**
 * This file is part of the DVSwitch Mode Switcher project.
 *
 * (c) 2024 Caleb <ko4uyj@gmail.com>
 *
 * For the full copyright and license information, see the
 * LICENSE file that was distributed with this source code.
 */

document.getElementById('talkgroup-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Retrieve values from the dropdown and manual input field
    const dropdownTgid = document.getElementById('talkgroup').value;
    const manualTgid = document.getElementById('manual-talkgroup')?.value.trim();

    // Determine which TGID to use: manual input takes priority
    const tgid = encodeURIComponent(manualTgid || dropdownTgid);

    if (!tgid) {
        showMessage('Please select or enter a valid talkgroup ID.');
        return;
    }

    // Send the TGID to the server
    fetch(`/tune/${tgid}`)
        .then(response => response.text())
        .then(() => {
            showMessage(`Switched to talkgroup ID: ${tgid}`);
        })
        .catch(error => {
            console.error('Error switching talkgroup:', error);
            showMessage('Failed to switch talkgroup.');
        });
});

function updateTalkgroups() {
    const mode = document.getElementById('mode').value;

    if (!mode) {
        showMessage('Please select a mode.');
        return;
    }

    fetch(`/mode/${mode}`)
        .then(response => response.json())
        .then(talkgroups => {
            const talkgroupSelect = document.getElementById('talkgroup');
            talkgroupSelect.innerHTML = ''; // Clear existing options

            talkgroups.forEach(tg => {
                const option = document.createElement('option');
                option.value = tg.tgid;
                option.textContent = `${tg.alias} (${tg.tgid})`;
                talkgroupSelect.appendChild(option);
            });

            showMessage(`Switched to mode: ${mode}`);
        })
        .catch(error => {
            console.error('Error updating talkgroups:', error);
            showMessage('Failed to update talkgroups.');
        });
}

function showMessage(message) {
    const banner = document.getElementById('message-banner');
    banner.textContent = message;
    banner.style.display = 'block';
    setTimeout(() => {
        banner.style.display = 'none';
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialization logic, if needed
});
