<template>
  <div id="container">
    <div id="blog-card">
      <a class="card-link" href="#">
        <article class="blog-card">
          <img class="post-image" :src="image" />
          <div class="article-details">
            <h4 class="post-category">{{ category }}</h4>
            <h3 class="post-title">{{ name }}</h3>
            <p class="post-description">{{ desc }}</p>
            <p class="post-author">{{ author }}</p>
          </div>
        </article>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  // https://www.logo.wine/a/logo/Tesla%2C_Inc./Tesla%2C_Inc.-Logo.wine.svg
  // https://res-3.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco/pd3irshwgvjuxqu9y0i9

  data: () => ({
    name: "Oct 15 - 17, 2020",
    category: "Ignatius", // "Travel"
    image:
      "https://www.logo.wine/a/logo/Tesla%2C_Inc./Tesla%2C_Inc.-Logo.wine.svg",
    author: "Senior Developer",
    desc: `Duration: 2 days`
  })
};
</script>

<style lang="scss" scoped>
$text: #777;
$black: #121212;
$white: #fff;
$red: #e04f62;
$border: #ebebeb;
$shadow: rgba(0, 0, 0, 0.2);

@mixin transition($args...) {
  transition: $args;
}

* {
  box-sizing: border-box;
  &::before,
  &::after {
    box-sizing: border-box;
  }
}

#container {
  width: 18rem;
  height: 10rem;
}

.blog-card {
  display: flex;
  flex-direction: row;
  background: $white;
  box-shadow: 0 0.1875rem 1.5rem $shadow;
  border-radius: 0.375rem;
  overflow: hidden;
}

.card-link {
  position: relative;
  display: block;
  color: inherit;
  text-decoration: none;
  padding: 0;
  border: none;
  &:hover .post-title {
    @include transition(color 0.3s ease);
    color: $red;
  }
  &:hover .post-image {
    @include transition(opacity 0.3s ease);
    opacity: 0.9;
  }
}

.post-image {
  @include transition(opacity 0.3s ease);
  display: block;
  width: 100%;
  object-fit: cover;
}

.article-details {
  padding: 0.5rem;
}

.post-category {
  display: inline-block;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.0625rem;
  margin: 0 0 0.5rem 0;
  padding: 0 0 0.5rem 0;
  border-bottom: 0.125rem solid $border;
}

.post-description {
  margin: 0;
}

.post-title {
  @include transition(color 0.3s ease);
  font-size: 1rem;
  line-height: 1.4;
  color: $black;
  font-weight: 400;
  margin: 0 0 0 0;
}

.post-author {
  font-size: 0.875rem;
  line-height: 1;
  margin: 0.5rem 0 0 0;
  padding: 0.5rem 0 0 0;
  border-top: 0.0625rem solid $border;
}

@media (max-width: 40rem) {
  #container {
    width: 9rem;
    height: 14rem;
  }

  .blog-card {
    flex-wrap: wrap;
  }
}

@supports (display: grid) {
  body {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 0.625rem;
    grid-template-areas: ". main main ." ". main main .";
  }

  #container {
    grid-area: main;
    align-self: center;
    justify-self: center;
  }

  .post-image {
    height: 100%;
  }

  .blog-card {
    display: grid;
    grid-template-columns: 2fr 3fr;
    grid-template-rows: 1fr;
  }

  @media (max-width: 40rem) {
    .blog-card {
      grid-template-columns: auto;
      grid-template-rows: 12rem 1fr;
    }
  }
}
</style>
