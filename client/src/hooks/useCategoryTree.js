export const useCategoryTree = (categories,currentSlug) => {

    console.log(categories,"categories in useCategoryTree")
    console.log(currentSlug,"current slug in useCategoryTree")

    const currentCategory = categories.find(cat => cat.slug === currentSlug)
    console.log(currentCategory,"current category in useCategoryTree")

    const children = categories.filter(cat => cat.parent === currentCategory?._id)
    console.log(children,"children in useCategoryTree")

    const siblings = categories.filter(cat => cat.parent === currentCategory?.parent)
    console.log(siblings,"siblings in useCategoryTree")

    return {
        currentCategory,
        children,
        siblings
    }
}