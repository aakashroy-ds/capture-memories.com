# Blog Management Guide

## System Overview

The blog system uses markdown files for content, which are dynamically converted to HTML and displayed on individual blog pages. This makes it easy to add, update, and manage blog posts without touching HTML.

## File Structure

```
new2026/
├── data/
│   ├── blog/
│   │   ├── TEMPLATE.md                    # Template for new posts
│   │   ├── triberg-black-forest.md        # Blog post content
│   │   └── [other-blog-posts].md
│   ├── posts.json                         # Blog post metadata & references
│   └── destinations.json
├── assets/
│   └── images/
│       └── blog/
│           ├── triberg/                   # Images organized by post slug
│           │   ├── waterfalls.jpg
│           │   ├── village.jpg
│           │   ├── cake.jpg
│           │   ├── hiking.jpg
│           │   └── autumn.jpg
│           └── [other-blog-posts]/        # Future posts
├── pages/
│   ├── blog.html                          # Blog listing with filters
│   ├── blog-triberg.html                  # Individual blog post page
│   └── [blog-post-name].html
├── js/
│   ├── blog.js                            # Blog listing logic
│   ├── markdown-renderer.js               # Markdown to HTML converter
│   └── [other scripts]
└── css/
    └── style.css                          # Includes blog styling
```

## Adding a New Blog Post

### Step 1: Create the Markdown Content

1. Copy `data/blog/TEMPLATE.md` to `data/blog/[post-slug].md`
2. Edit the markdown file with your content
3. Follow the markdown syntax guide (see below)

### Step 2: Add Post Metadata to posts.json

Edit `data/posts.json` and add an entry:

```json
{
  "id": "your-post-id",
  "slug": "blog-your-post-slug",
  "title": "Your Blog Post Title",
  "date": "Month DD, YYYY",
  "location": "City, Country",
  "country": "country-code",
  "countryLabel": "Country Name",
  "readTime": "X min read",
  "description": "Brief summary of the post for the blog card",
  "image": "../assets/images/blog/your-post-slug/featured-image.jpg",
  "gradient": "linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)"
}
```

### Step 3: Create the Blog Post HTML Page

1. Copy `pages/blog-triberg.html` to `pages/blog-[your-post-slug].html`
2. Update the page title and metadata (no other changes needed)
3. The markdown will automatically load from `data/blog/[post-slug].md`

### Step 4: Add Images to Assets

1. Create a new directory: `assets/images/blog/[post-slug]/`
2. Add all images for this post to that directory
3. Reference images in markdown as: `![Alt text](../assets/images/blog/[post-slug]/image-name.jpg)`

## Markdown Syntax Guide

### Headings

```markdown
# H1 - Main title (don't use, reserved for post title)
## H2 - Section heading
### H3 - Subsection
#### H4 - Minor heading
```

### Text Formatting

```markdown
**Bold text** - for emphasis
*Italic text* - for secondary emphasis
`Code snippet` - for inline code
```

### Images

```markdown
![Alt text describing the image](../assets/images/blog/post-slug/image-name.jpg)
```

**Best Practices:**
- Use descriptive alt text (for accessibility)
- Images are responsive and will scale to fit container
- Captions are automatically generated from alt text
- Keep image file names lowercase and use hyphens (e.g., `waterfall-view.jpg`)

### YouTube Videos

```markdown
[youtube: VIDEO_ID]
```

Replace `VIDEO_ID` with the ID from YouTube URL:
- URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- ID: `dQw4w9WgXcQ`

Example:
```markdown
[youtube: dQw4w9WgXcQ]
```

### Lists

**Unordered Lists:**
```markdown
- First item
- Second item
- Third item
```

**Ordered Lists:**
```markdown
1. First step
2. Second step
3. Third step
```

### Blockquotes (Tips & Highlights)

```markdown
> **Pro Tip:** This is important information that stands out.
```

Renders with a blue left border and light background.

### Line Breaks

Add a blank line between paragraphs for proper spacing.

## Image Guidelines

- **Dimensions:** 1200px wide minimum for blog images
- **Format:** JPG for photos, PNG for graphics
- **Size:** Compress images to < 500KB each
- **Quality:** High quality photos encourage engagement
- **Captions:** Use descriptive alt text that describes the image content

## Post Metadata Reference

| Field | Description | Example |
|-------|-------------|---------|
| id | Unique identifier | "triberg-black-forest" |
| slug | URL slug for the blog page | "blog-triberg" |
| title | Post title | "Exploring Triberg and the Black Forest" |
| date | Publication date | "May 6, 2026" |
| location | Geographic location | "Triberg, Germany" |
| country | Country code for filtering | "germany" |
| countryLabel | Country display name | "Germany" |
| readTime | Estimated reading time | "8 min read" |
| description | Short summary for blog cards | "Discover the enchanting beauty..." |
| image | Path to featured image | "../assets/images/blog/triberg/..." |
| gradient | CSS gradient overlay color | "linear-gradient(135deg, ...)" |

## Features

### Automatic Blog Listing
- Posts automatically appear on `/pages/blog.html`
- Country filtering works automatically based on `country` field in posts.json
- "Read More" links automatically point to the correct blog post page

### Responsive Design
- All images scale automatically on mobile
- YouTube embeds are responsive
- Markdown content is mobile-friendly

### SEO Friendly
- Proper heading hierarchy (H1, H2, H3)
- Image alt text for accessibility
- Meta descriptions in HTML

## Workflow Example

1. Write content in markdown: `data/blog/paris-vacation.md`
2. Add metadata to `posts.json`
3. Copy and rename blog page: `pages/blog-paris.html`
4. Create image folder: `assets/images/blog/paris-vacation/`
5. Add images to folder
6. Deploy

Blog is now live with country filtering, full-page view, and listing on main blog page!

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Images not showing | Check path format and verify file names match exactly |
| Markdown not rendering | Verify file is in `data/blog/` and filename matches slug in posts.json |
| YouTube video not showing | Check that VIDEO_ID is correct (format: `[youtube: VIDEO_ID]`) |
| Blog post doesn't appear in listing | Verify `slug` field matches the HTML filename and metadata is in posts.json |

## Tips for Success

1. **Keep posts scannable:** Use headings, lists, and short paragraphs
2. **Mix media:** Alternate text with images and videos
3. **Include context:** Describe what readers are looking at in images
4. **Consistent naming:** Use lowercase, hyphens in all file names
5. **Proofread:** Check markdown renders correctly in browser before publishing
6. **Optimize images:** Use tools like TinyPNG or ImageOptim to compress
