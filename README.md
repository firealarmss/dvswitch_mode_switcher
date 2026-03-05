# DVSwitch Mode Changer

NOTE:  All credit goes to firelarmss - I just added the manual entry of talkgroups and fixed a couple menus with AI.   This is a placeholder until my suggestions can be rolled into the original code.

Basic service to switch modes/talkgroups of a dvswitch server. Defualt webserver uses port 3000, you can change it in configs/config.yml. USRP support is also available.

## Install Process:
```bash
sudo -s

apt update && apt upgrade && apt install git && apt install nodejs

cd /opt

git clone https://github.com/hquimby/dvswitch_mode_switcher

cd dvswitch_mode_switcher

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"

[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

source ~/.bashrc

nvm install 18

nvm use 18

cp configs/config.example.yml configs/config.yml

cp configs/tg_alias.example.yml configs/tg_alias.yml

npm install yargs path

npm i

node index.js -c configs/config.yml
```

## Systemd Support:
```bash
cd /opt/dvswitch_mode_switcher

cp debian/dvswitch_mode_switcher.service /etc/systemd/system/dvswitch_mode_switcher.service

systemctl daemon-reload

systemctl enable dvswitch_mode_switcher.service

systemctl start dvswitch_mode_switcher.service
```
