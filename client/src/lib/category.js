


export const getBreadCrumb = (categoryId, categories) => {

  console.log(categories.length, categoryId, "categories count and categoryId in getBreadCrumb");
  // Validate categories is an array
  if (!Array.isArray(categories) || categories.length === 0) {
    return [{ _id: "home", name: "Home", href: "/" }];
  }

  // Early exit if no categoryId
  if (!categoryId) {
    return [{ _id: "home", name: "Home", href: "/" }];
  }

  // Build map only once efficiently
  const map = new Map(categories.map(category => [category._id, category]));

  console.log(categories.length, categoryId, "categories count and categoryId in getBreadCrumb");

  let current = map.get(categoryId);
  const breadcrumb = [];

  // Build breadcrumb from child to parent, then reverse
  while (current){
    breadcrumb.push(current);
    current = map.get(current.parent);
  }

  // Reverse to get parent to child order, more efficient than unshift
  breadcrumb.reverse();

  return [
    { _id: "home", name: "Home", href: "/" },
    ...breadcrumb
  ];

}