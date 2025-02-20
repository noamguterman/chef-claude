import React from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"

export default function Main() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")
    const [errorState, setErrorState] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
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
            return data

        } catch(err) {
            console.log('Error:', err)
            alert('Unable to access AI. Please refresh and try again')
        }
    }

    async function getRecipe() {
        setIsLoading(true)
        try {
            const recipeMarkdown = await getRecipeFromChefClaude(ingredients)
            setRecipe(recipeMarkdown)
        } finally {
            setIsLoading(false)
        }
    }

    function addIngredient(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const newIngredient = formData.get("ingredient")
        if (newIngredient === "") {
            setErrorState(true)
        } else {
            setErrorState(false)
            setIngredients(prevIngredients => [...prevIngredients, newIngredient])
            e.target.reset()
        }
    }
    
    return (
        <main>
            <form onSubmit={addIngredient} className="add-ingredient-form">
                <input
                    className={errorState ? "error" : ""}
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
                    isLoading={isLoading}
                />
            }

            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}