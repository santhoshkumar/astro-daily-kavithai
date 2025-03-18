export async function fetchPosts(page = 1, perPage = 10) {
  try {
    const response = await fetch("https://random.kavithai.site/kavithai.md");
    if (!response.ok) throw new Error("Failed to fetch Markdown content");

    const markdownContent = await response.text();
    const formattedPosts = markdownContent
      .split("\n\n")
      .filter(content => content.trim() !== "")
      .map((content, index) => ({
        id: (index + 1).toString(),
        content: content.trim().replace(/\n/g, "<br>")
      }))
      .reverse();

    const totalPosts = formattedPosts.length;
    const totalPages = Math.ceil(totalPosts / perPage);

    const startIndex = (page - 1) * perPage;
    const paginatedPosts = formattedPosts.slice(startIndex, startIndex + perPage);

    return { posts: paginatedPosts, totalPages };
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    return { posts: [], totalPages: 1 };
  }
}
