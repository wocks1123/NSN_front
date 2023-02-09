<template>
  <div
    class="bg-gray-800 h-full flex flex-col flex-grow"
  >
    <!-- Top -->
    <div
      class="flex-grow flex relative "
    >
      <!-- Before Upload-->
      <div
        v-show="localFiles.length === 0"
        ref="uploadImage"
        class="w-full  flex flex-col justify-center items-center bg-gray-100"
      >
        <input ref="fileInput" type="file" :value="files" @input="fileUpdated" multiple class="hidden"/>
        <div class="">
          <b-icon icon="image" font-scale="4" />
        </div>

        <div class="">
          <button
            @click="clickUploadButton"
            class="bg-blue-500 text-white py-1 px-2 rounded-md"
          >
            컴퓨터에서 선택
          </button>
        </div>

      </div>

      <div
        v-if="localFiles.length !== 0"
        class="flex w-full  justify-center items-center"
      >
        <div class="w-full object-contain h-full">


          <img
            ref="imageArea"
            class="w-full object-contain min-h-0 h-full "
            :src="window.URL.createObjectURL(localFiles[selectedIdx])"
          />
        </div>
        <!-- Carousel Buttons -->
        <div
          v-show="localFiles.length !== 0 && selectedIdx !== localFiles.length - 1"
          class="
            absolute right-2
          "
        >
          <button
            @click="toRightImage"
            class="
              w-9 h-9
              bg-gray-600 hover:bg-gray-400 rounded-full
              flex justify-center items-center text-white
            "
          >
            <b-icon class="svg-block" icon="chevron-right" font-scale="1.5" />
          </button>
        </div>

        <div
          v-show="localFiles.length !== 0 && selectedIdx !== 0"
          class="
            absolute left-2
          "
        >
          <button
            @click="toLeftImage"
            class="
              w-9 h-9
              bg-gray-600 hover:bg-gray-400 rounded-full
              flex justify-center items-center text-white
            "
          >
            <b-icon class="svg-block" icon="chevron-left" font-scale="1.5" />
          </button>
        </div>


      </div>

      <!-- Bottom -->

        <!-- Image Array -->
        <div
          v-show="imageListModal"
          ref="outer"

          class="
            w-full

            absolute bottom-12 left-0
            mb-2 h-26
            bg-opacity-70
            flex justify-end
            flex-nowrap
            rounded-r-lg
          "
        >

          <!-- Inner -->
          <div
            ref="inner"
            @scroll="handleScroll"
            class="
                h-26
                no-scrollbar
                overflow-auto flex flex-nowrap
                items-center
                rounded-l-lg
                p-2
                gap-2
                transition-all bg-gray-600
              "
          >
            <!-- Left Arrow -->
            <div
              v-if="innerWidth + 104 > outerWidth
                      && scrollLeft !== 0"
              @click="toLeft"
              class="
                  flex items-center justify-center z-50
                  absolute left-6 w-5 h-5 bg-gray-200 rounded-full
                  border-2 border-black
                "
            >
              <button>
                <b-icon icon="chevron-left" />
              </button>
            </div>

            <!-- Right Arrow -->
            <div
              v-if="innerWidth + 104 > outerWidth
                       && scrollWidth - scrollLeft !== innerWidth"
              @click="toRight"
              class="
                  flex items-center justify-center z-50
                  w-5 h-5 absolute right-16 bg-gray-200 rounded-full
                  border-2 border-black
                "
            >
              <button>
                <b-icon icon="chevron-right" />
              </button>
            </div>

            <!-- Image Thumbnails -->
            <div
              v-for="(file, i) in localFiles"
              class="
                  relative
                  flex flex-none items-center justify-center
                  w-24 h-24 bg-gray-100
                  cursor-pointer
                "
            >
              <button
                v-show="selectedIdx === i"
                @click="clickImageCloseButton(i)"
                class="
                    absolute right-1 top-1 h-4 w-4 bg-gray-800 text-white
                    flex justify-center items-center rounded-full
                  "
              >
                <b-icon icon="x" />
              </button>

              <img
                @click="clickImageThumbnail(i)"
                class="filter"
                :class="selectedIdx === i ? '' : 'grayscale'"
                :src="window.URL.createObjectURL(file)"
              />
            </div>

          </div>

          <div
            class="flex justify-center items-center bg-gray-600 pr-2 rounded-r-lg"
          >
            <button
              @click="clickAddImage"
              class="ml-2 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <b-icon icon="plus" font-scale="2" />
            </button>
          </div>
        </div>

        <!-- Button Area -->
<!--        <div class="flex w-full pb-2 justify-between pr-2">-->

          <!-- Dummy -->


          <!-- Dots -->
          <div
            class="absolute left-1/2 bottom-4 flex justify-center items-center gap-1"
          >
            <div
              v-for="(item, i) in localFiles"
              class="w-1.5 h-1.5 border rounded-full"
              :class="selectedIdx === i ?
                    'bg-blue-700 border-blue-700' : 'bg-gray-100 border-gray-500'"
            />
          </div>

          <button
            v-if="localFiles.length !== 0"
            @click="clickGalleryButton"
            class="
              absolute bottom-4 right-4
              rounded-full w-9 h-9 bg-gray-500
            "
          >
            <b-icon icon="images" scale="1.25" color="white"/>
          </button>
<!--        </div>-->


    </div>
  </div>
</template>

<script>
export default {
  name: "DragDropFileUploader",
  props: ["files"],
  data: () => ({
    window: window,

    localFiles: [],
    arr: [],
    outerWidth: 0,
    innerWidth: 0,

    scrollWidth: 0,
    scrollLeft: 0,

    imageListModal: false,

    selectedIdx: 0,
  }),
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },

  mounted() {
    window.addEventListener('resize', this.handleResize)

    this.$nextTick( function () {
      this.outerWidth = this.$refs.outer.clientWidth
      this.innerWidth = this.$refs.inner.clientWidth
      this.$refs.inner.addEventListener('scroll',  this.handleScroll)
    })


    const hasFiles = ({dataTransfer: {types = []}}) =>
      types.indexOf("Files") > -1;

    this.$refs.fileInput.onchange = (e) => {
      console.log("this.$refs.fileInput.onchange")
      for (const file of e.target.files) {
        this.localFiles.push(file)
      }
      this.onFileUploaded()
    };

    this.$refs.uploadImage.addEventListener("dragenter", (evt) => {
      evt.preventDefault();
      let ret = hasFiles(evt)
      if (!ret) {
        return;
      }
    });

    this.$refs.uploadImage.addEventListener("drop", (evt) => {
      evt.preventDefault();
      for (const file of evt.dataTransfer.files) {
        this.localFiles.push(file)
      }
      this.onFileUploaded()
    });

    this.$refs.uploadImage.addEventListener("dragover", (evt) => {
      if (hasFiles(evt)) {
        evt.preventDefault();
      }
    });
    this.$refs.uploadImage.addEventListener("dragleave", (evt) => {

    });
  },

  methods: {
    fileUpdated() {

    },
    clickUploadButton() {
      this.$refs.fileInput.click()

      this.outerWidth = this.$refs.uploadImage.clientWidth

    },
    clickGalleryButton() {
      this.imageListModal = !this.imageListModal
    },
    clickAddImage() {
      this.$refs.fileInput.click()
    },
    clickImageThumbnail(i) {
      this.selectedIdx = i
    },
    clickImageCloseButton(i) {
      this.localFiles.splice(i, 1)
      this.onFileRemoved()

      this.selectedIdx = i > 0 ? i - 1 : 0

      if (this.localFiles.length === 0) {
        this.imageListModal = false
      }
    },
    onFileUploaded() {
      this.$emit('input', this.localFiles)
      this.outerWidth = this.$refs.outer.clientWidth
      this.innerWidth = this.$refs.inner.clientWidth

    },
    onFileRemoved() {
      this.$emit('input', this.localFiles)
      this.outerWidth = this.$refs.outer.clientWidth
      this.innerWidth = this.$refs.inner.clientWidth
    },
    handleResize() {
      this.outerWidth = this.$refs.outer.clientWidth
      this.innerWidth = this.$refs.inner.clientWidth
    },
    handleScroll() {
      this.scrollLeft = this.$refs.inner.scrollLeft
      this.scrollWidth = this.$refs.inner.scrollWidth
      this.innerWidth = this.$refs.inner.clientWidth

      let diff =  this.$refs.inner.scrollWidth - this.$refs.inner.scrollLeft
      let dist = this.$refs.inner.clientWidth
    },

    // Move scroll...
    toLeft() {
      this.$refs.inner.scrollTo({left:this.scrollLeft - 100, behavior:'smooth'})
    },
    toRight() {
      this.$refs.inner.scrollTo({left:this.scrollLeft + 100, behavior:'smooth'})
    },
    /////////////////////////////
    toLeftImage() {
      this.selectedIdx--
    },
    toRightImage() {
      this.selectedIdx++
    },

  }
}
</script>

<style scoped>

</style>
