<template>
  <nav>
    <div class="container">
      <header>
        <div class="logo">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-app" />
          </svg>
          <h1 class="title">资源小白菌</h1>
        </div>
        <div class="nav">
          <li class="hover_text">首页</li>
          <li>资源</li>
          <li>公众号</li>
        </div>
        <div class="search desktop">
          <i class="iconfont icon-8search"></i>
          <input type="text" />
        </div>
        <div class="login hover">
          <i class="iconfont icon-denglu"></i>
        </div>
      </header>
    </div>
  </nav>
  <div class="mobile search">
    <i class="iconfont icon-8search"></i>
    <input type="text" placeholder="请输入" />
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
nav {
  width: 100%;
  background-color: $bg-primary;
  color: $white;
  @include shadow();
  margin: 0;
  header {
    padding: 1rem 0;
    width: 90%;
    margin: 0 auto;
    display: flex;
    gap: 3rem;
    align-items: center;
    @media (max-width: $tablet) {
      width: 85%;
    }
    .logo {
      display: flex;
      align-items: center;

      gap: 1rem;
      .icon {
        width: 1.8rem;
        height: 1.8rem;
      }
    }
    .nav {
      display: flex;
      gap: 1rem;
      font-weight: bold;
      font-size: 1.3rem;
      li {
        list-style: none;
        cursor: pointer;
      }
      @media (max-width: $tablet) {
        display: none;
      }
    }

    .login {
      display: inline-block;
      width: 2rem;
      text-align: center;
      height: 2rem;
      cursor: pointer;
      line-height: 2rem;
      border-radius: 1rem;
      background-color: rgba($color: $bg-primary-darker, $alpha: 0.5);
      @media (max-width: $tablet) {
        margin-left: auto;
      }
    }
  }
}
.search {
  margin-left: auto;
  display: flex;
  align-items: center;

  .iconfont {
    color: var(--text-color);
    transform: translateX(1.4rem);
  }
  input {
    border: none;
    padding: 0.5rem;
    padding-left: 1.8rem;
    border-radius: 0.3rem;
    background-color: $bg-primary-darker;
    color: $white;
    &:focus {
      outline: none;
    }
  }
}
.search.desktop {
  @media (max-width: $mobile) {
    margin-left: 0;
    display: none;
  }
}

.search.mobile {
  display: flex;
  justify-content: center;
  padding: 2rem;
  gap: 1rem;
  input {
    padding-left: 0.5rem;
    padding: 0.5rem;
    background-color: $white;
    color: $text-primary;
    border: 1px solid $bg-primary-darker;
    width: 75%;
    max-width: 15rem;
  }
  .iconfont {
    transform: translateX(0);
    color: $bg-primary-darker;
    order: 2;
    font-size: 1.5rem;
  }
  @media (min-width: $mobile) {
    display: none;
  }
}
</style>