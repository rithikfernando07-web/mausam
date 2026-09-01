@echo off
echo Initializing Git repository for Mausam...
cd /d "%~dp0"

git init
git add .
git commit -m "feat: complete modern personalized Mausam weather mobile app prototype"
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/rithikfernando07-web/mausam.git
echo Pushing to https://github.com/rithikfernando07-web/mausam.git ...
git push -u origin main

echo Done!
pause
