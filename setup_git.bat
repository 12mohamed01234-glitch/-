@echo off
echo ==========================================
echo      ZNU Platform - Git Setup Script
echo ==========================================

echo [1/5] Checking for Git...
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Git is NOT found!
    echo Please install Git from https://git-scm.com/download/win
    echo Then RESTART VS Code and run this script again.
    pause
    exit /b
)

echo [2/5] Configuring Identity...
git config --global user.name "ZNU Admin"
git config --global user.email "admin@znu.edu.eg"

echo [3/5] Initializing Repository...
git init
git add .
git commit -m "Initial commit of ZNU Platform"

echo [4/5] Linking to GitHub...
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/12mohamed01234-glitch/-.git

echo [5/5] Pushing Code...
echo You may be asked to sign in to GitHub in a browser window.
git push -u origin main

echo ==========================================
echo      DONE!
echo ==========================================
pause
