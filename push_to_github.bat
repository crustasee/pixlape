@echo off
echo Setting remote URL to PixlApe...
git remote set-url origin https://github.com/crustasee/pixlape-web.git
if %errorlevel% neq 0 git remote add origin https://github.com/crustasee/pixlape-web.git

echo Adding files...
git add .

echo Committing changes...
git commit -m "Rename project to PixlApe and update configs"

echo Renaming branch to main...
git branch -M main

echo Pushing to GitHub...
git push -u origin main

echo.
echo Process complete! Press any key to exit.
pause
