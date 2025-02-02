# 🍽️ Chef Claude – AI-Powered Recipe Generator  

Generate recipes based on available ingredients using **React** and the **Anthropic AI SDK**. This project integrates advanced React concepts and applies AI technology to real-world use cases.  

![Chef Claude](https://raw.githubusercontent.com/noamguterman/chef-claude/refs/heads/main/chef-claude-preview.png)

## 🚀 Live Demo  
🔗 [Try Chef Claude]([https://your-live-demo-link.com](https://noamguterman.github.io/chef-claude/))  

---

## 📝 Features  
✅ **AI-powered recipe generation** – Uses Anthropic's AI to suggest recipes based on user-input ingredients.  
✅ **Smooth scrolling** – Auto-scrolls to the recipe section when generated.  
✅ **Dynamic ingredient management** – Add ingredients interactively and generate new recipes.  
✅ **Responsive design** – Works seamlessly across different screen sizes.  

---

## 🛠️ Tech Stack  
- **Frontend:** React, React Markdown  
- **AI Integration:** Anthropic AI SDK  
- **Backend:** Cloudflare Workers  
- **Deployment:** GitHub Pages / Cloudflare  

---

## 🎯 How It Works  
1️⃣ Enter ingredients into the input field.  
2️⃣ Click **"Add ingredient"** to build your ingredient list.  
3️⃣ Once you have at least four ingredients, click **"Get a recipe"**.  
4️⃣ Chef Claude generates a **markdown-formatted** recipe using AI.  
5️⃣ The page automatically scrolls to the generated recipe for easy viewing.  

---

## 🏠 Project Structure  
```
/src
  ├── components
  │   ├── Header.jsx         # App header with logo and title
  │   ├── Main.jsx           # Main app logic & state management
  │   ├── IngredientsList.jsx # Displays user-added ingredients
  │   ├── ClaudeRecipe.jsx   # Renders AI-generated recipe
  ├── images                 # Static assets like logos
  ├── index.css              # Global styles
  ├── main.jsx               # Entry point (React DOM rendering)
  ├── App.jsx                # App component combining all parts
```

---

## 🛠️ API & AI Integration  
- **Anthropic AI SDK** processes user ingredients and generates recipes.  
- **Cloudflare Workers** act as a lightweight backend to handle AI requests.  

🔗 **API Endpoint:** `https://anthropic-api-worker-chefclaude.noamguterman.workers.dev/`  

---

## 🌟 Why This Project?  
This project showcases **React skills, API integration, and AI-powered interactions**. It demonstrates proficiency in:  
✔️ **State management** (React Hooks)  
✔️ **Fetching AI-generated content** (Async/Await, Fetch API)  
✔️ **Smooth UI interactions** (scroll effects, conditional rendering)  
✔️ **AI prompt engineering** (Claude AI model optimization)  

---

## 🐝 License  
This project is for personal use and is not licensed for redistribution or modification.

---

