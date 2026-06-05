# Contributing to DevBoard 🎉

Thanks for taking the time to contribute! Here's how to get started.

## 🐛 Found a bug?
Open an issue with the `bug` label. Describe what happened and steps to reproduce.

## 💡 Have an idea?
Open an issue with the `enhancement` label before building — let's discuss first!

## 🛠️ Want to code?

1. Fork this repo
2. Create your branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes
4. Commit using conventional commits:
   ```bash
   git commit -m "feat: add dark mode toggle"
   git commit -m "fix: pomodoro timer reset bug"
   git commit -m "docs: update setup guide"
   ```
5. Push and open a Pull Request

## 📋 Good First Issues (start here!)

Look for the `good first issue` label. Examples:
- Add due date to task cards
- Dark mode toggle
- Drag to reorder columns
- Add task comments
- Sound alert when Pomodoro ends
- Mobile responsive layout

## 🏗️ Local Setup

```bash
git clone https://github.com/YOUR_USERNAME/devboard.git
cd devboard
npm run install:all
cp .env.example server/.env   # fill in your values
npm run dev
```

## 📐 Code Style
- Functional React components only (no class components)
- Use Tailwind for styling
- Keep components small and focused
- Use async/await (no .then chains)

## ✅ PR Checklist
- [ ] My code follows the project style
- [ ] I tested my changes locally
- [ ] I updated the README if needed
- [ ] My commit messages are clear

Thank you! Every contribution matters 🚀
