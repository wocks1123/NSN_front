<template>
  <div>

    <!-- Footer -->
    <div
      class="
        fixed
        w-full
        bottom-0
        md:hidden
        bg-red-300
        items-center
        z-20
      "
    >
      <div class="grid grid-cols-4 block h-12 items-center justify-items-center">
        <button
          @click="clickFooterButton(item.val)"
          class="items-center inline-block bg-blue-100 cursor-pointer"
          v-for="(item, i) in footerItems"
          :key="i"
        >
          <b-icon class="svg-block" :icon="item.selected ? item.icon + '-fill' : item.icon " font-scale="2"/>
        </button>
      </div>
    </div>

    <!-- Nav -->
    <div
      id="nav"
      v-click-outside="clickOutside"
      @resize="onresize"
      ref="nav"
      class="
          hidden
          md:block
          md:fixed
          h-screen
          bg-yellow-100
          z-30
          nav-transition
        "
      :class="this.sideOpen || this.windowWidth < 1280 ? 'w-16' : 'w-56'"
    >
      <!-- Logo Area -->
      <div
        class="bg-gray-500"
      >
        Logo
      </div>
      <!-- Button Area -->
      <div>
        <NavButton
          v-for="(item, i) in navItems"
          :key="i"
          :icon="item.icon"
          :text="item.text"
          :selected="item.selected"
          :shorten="hideText"
          @click="clickNavButton(item.val)"
        />
      </div>

      <!-- Side Nav Area -->
      <NavSearchSide
        v-model="sideSearchOpen"
      />
      <NavAlertSide
        v-model="sideAlertOpen"
      />
    </div>

    <!-- Post Modal -->
    <ModalPostModal v-model="postModal" @close="onClosePostModal"/>
  </div>
</template>

<script>

export default {
  name: "Navbar",
  data: () => ({
    windowWidth: 0,
    navWidth: 256,
    navShorten: false,
    hideText: false,

    sideOpen: false,
    sideSearchOpen: false,
    sideAlertOpen: false,

    slideModal: true,
    postModal: false,

    navItems: {
      home: {
        val: 'home',
        icon: 'house',
        text: '홈',
        selected: true,
      },
      search: {
        val: 'search',
        icon: 'search',
        text: '검색',
        selected: false,
      },
      explore: {
        val: 'explore',
        icon: 'compass',
        text: '탐색',
        selected: false,
      },
      alert: {
        val: 'alert',
        icon: 'heart',
        text: '알림',
        selected: false,
      },
      post: {
        val: 'post',
        icon: 'plus-square',
        text: '만들기',
        selected: false,
      },
      profile: {
        val: 'profile',
        icon: 'person',
        text: '프로필',
        selected: false,
      },

    },
    footerItems: {
      home: {
        val: 'home',
        icon: 'house',
        text: '홈',
        selected: true,
      },
      explore: {
        val: 'explore',
        icon: 'compass',
        text: '만들기',
        selected: false,
      },
      post: {
        val: 'post',
        icon: 'plus-square',
        text: '만들기',
        selected: false,
      },
      profile: {
        val: 'profile',
        icon: 'person',
        text: '프로필',
        selected: false,
      },
    },

    selectedPrevItem: '', // for closing post modal...
    selectedNavItem: 'home',
    selectedFooterItem: 'home',
  }),
  mounted() {
    this.windowWidth = window.innerWidth
    window.addEventListener('resize', this.onresize);

    this.navItems[this.selectedNavItem].selected = true
    this.footerItems[this.selectedFooterItem].selected = true
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onresize);
  },
  watch: {
    $route() {
      // console.log("$route path", this.$route.path)
      // console.log("$route name", this.$route.name)
      if (this.$route.name.includes("index")) {
        this.toggleSelectedItem("home")
      }
      else if (this.$route.name.includes("explore")) {
        this.toggleSelectedItem("explore")
      }
      else if (this.$route.name.includes("profile")) {
        this.toggleSelectedItem("profile")
      }
      else if (this.$route.name.includes("post")) {
        this.navItems[this.selectedNavItem].selected = false
        this.selectedPrevItem = this.selectedNavItem
      }
    },
  },
  methods: {
    onresize() {
      let width = window.innerWidth
      this.windowWidth = width
    },
    openModal(val) {
      this.sideOpen = true
      this.hideText = true
      if (val === 'alert') {
        this.sideSearchOpen = false
        this.sideAlertOpen = true
      }
      else if (val === 'search') {
        this.sideAlertOpen = false
        this.sideSearchOpen = true
      }
    },
    closeModal(val) {
      this.sideOpen = false
      this.hideText = false
      if (val === 'alert') {
        this.sideAlertOpen = false
      }
      else if (val === 'search') {
        this.sideSearchOpen = false
      }
      this.sideAlertOpen = false
      this.sideSearchOpen = false
    },
    clickOutside(evt) {
      if (evt.target.id === 'nav-side') return

      if (this.sideOpen) {
        this.closeModal()
        this.toggleSelectedItem(this.selectedPrevItem)
      }
    },
    clickNavButton(val) {
      this.route(val)
    },
    clickFooterButton(val) {
      this.route(val)
    },
    toggleSelectedItem(val) {
      this.selectedPrevItem = this.navItems[this.selectedNavItem].val

      this.navItems[this.selectedNavItem].selected = false
      this.selectedNavItem = val
      this.navItems[this.selectedNavItem].selected = true

      // for footer
      if (val !== "search" && val !== "alert") {
        this.footerItems[this.selectedFooterItem].selected = false
        this.selectedFooterItem = val
        this.footerItems[this.selectedFooterItem].selected = true
      }
    },
    route(val) {
      if (val === 'home') {
        this.$router.push('/')
        if (this.sideOpen) this.closeModal()
        this.toggleSelectedItem(val)
      }
      else if (val === 'search') {
        this.openModal(val)
        this.toggleSelectedItem(val)
      }
      else if (val === 'post') {
        this.postModal = true
        this.toggleSelectedItem(val)
      }
      else if (val === 'alert') {
        this.openModal(val)
        this.toggleSelectedItem(val)
      }
      else if (val === 'profile') {
        this.$router.push('/profile/' + this.$auth.user.userId)
        if (this.sideOpen) this.closeModal()
        this.toggleSelectedItem(val)
      }
      else if (val === 'explore') {
        this.$router.push('/explore')
        if (this.sideOpen) this.closeModal()
        this.toggleSelectedItem(val)
      }
    },
    onClosePostModal() {
        this.toggleSelectedItem(this.selectedPrevItem)
    },
  },
}

</script>

<style scoped>

</style>
