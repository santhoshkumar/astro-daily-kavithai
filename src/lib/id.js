export async function fetchPosts() {
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
        }));
  
      return formattedPosts;
    } catch (error) {
      console.error("Error fetching posts:", error.message);
      return [];
    }
  }
  
  export async function getAllPostIds() {
    const posts = await fetchPosts();
    return posts.map(post => post.id);
  }
  
  export async function fetchPostById(id) {
    const posts = await fetchPosts();
    return posts.find(post => post.id === id) || null;
  }
  