


export const getBreadCrumb = (slug, categories) => {

  console.log(categories.length, slug, "categories count and slug in getBreadCrumb");
  // Validate categories is an array

  const defaultBreadcrumb = [{ _id: "home", name: "Home", href: "/" }];


  if (!Array.isArray(categories) || categories.length === 0) {
    return defaultBreadcrumb;
  }

  // Early exit if no slug
  if (!slug) {
    return defaultBreadcrumb;
  }

  // Build map only once efficiently
  const idMap = new Map(categories.map(category => [category._id, category]));

  const slugMap = new Map(categories.map(category => [category.slug, category]));

  let current = slugMap.get(slug);

  console.log(categories.length, slug, "categories count and slug in getBreadCrumb");

  const breadcrumb = [];

  // Build breadcrumb from child to parent, then reverse
  while (current){
    breadcrumb.push({
      _id: current._id,
      name: current.name,
      slug: current.slug,
      href: `/products?category=${current.slug}`
    });
    current = idMap.get(current.parent);
  }

  // Reverse to get parent to child order, more efficient than unshift
  breadcrumb.reverse();

  console.log(breadcrumb, "breadcrumb in getBreadCrumb");

  return [
    ...defaultBreadcrumb,
    ...breadcrumb
  ];

}