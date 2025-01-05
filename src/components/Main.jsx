import React from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"

export default function Main() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")
    const recipeSection = React.useRef(null)
    
    React.useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null) {
            const yCoord = recipeSection.current.getBoundingClientRect().top + window.scrollY
            window.scroll({
                top: yCoord,
                behavior: "smooth"
            })
        }
    }, [recipe])

    async function getRecipeFromChefClaude(ingredientsArr) {
        const messages = [
            {
                role: 'user',
                content: `I have ${ingredientsArr.join(', ')}. Please give me a recipe you'd recommend I make!`
            }
        ]

        try {
            const url = 'https://anthropic-api-worker-chefclaude.noamguterman.workers.dev/'
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(messages),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
    
            if (!response.ok) {
                throw new Error(`Worker Error: ${data.error}`)
            }
            return data.content

        } catch(err) {
            console.log('Error:', err)
            alert('Unable to access AI. Please refresh and try again')
        }
    }

    async function getRecipe() {
        console.log('Getting recipe...')
        const recipeMarkdown = await getRecipeFromChefClaude(ingredients)
        console.log('Recipe:', recipeMarkdown)
        setRecipe(recipeMarkdown)
        console.log('Recipe set')
    }

    function addIngredient(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }
    
    return (
        <main>
            <form onSubmit={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    ref={recipeSection}
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                />
            }

            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}