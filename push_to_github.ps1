# Mausam GitHub Push Script
$Location = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $Location

Write-Host "Initializing and pushing Mausam repository to GitHub..." -ForegroundColor Cyan

git init
git add .
git commit -m "feat: complete modern personalized Mausam weather mobile app prototype"
git branch -M main
try { git remote remove origin } catch {}
git remote add origin https://github.com/rithikfernando07-web/mausam.git
Write-Host "Pushing to remote origin main..." -ForegroundColor Green
git push -u origin main

Write-Host "Successfully pushed to GitHub!" -ForegroundColor Green
