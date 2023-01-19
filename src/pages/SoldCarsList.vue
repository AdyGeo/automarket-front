<template>
  <q-page class="relative-position">

    <!-- <q-scroll-area class="absolute full-width full-height"> -->
    <q-list class="flex flex-center">
      <q-card clickable @click="cardDetails(auto.slug)" v-ripple class="my-card q-ma-md cursor-pointer" style="width:350px" v-for="auto in autovehicule.results" :key="auto.id">
        <q-img fit="cover" no-spinner height="230px" :src="(auto.imagine_auto.length > 0 ? auto.imagine_auto[0].foto : '')">
          <div v-if="auto.vandut" class="absolute-full text-h6 flex flex-center">
          VANDUT
          </div>
        </q-img>
        <q-card-section>
          <div class="items-center text-subtitle1">
            {{auto.titlu}}
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="text-caption text-grey">
            {{auto.an_fabricatie}}&nbsp;&nbsp;&bull;&nbsp;&nbsp;{{auto.km}}&nbsp;km&nbsp;&nbsp;&bull;&nbsp;&nbsp;{{auto.combustibil.toLowerCase()}}&nbsp;&nbsp;&bull;&nbsp;&nbsp;{{auto.capacitate_cilindrica}}&nbsp;cm3
          </div>
          <div class="text-h6 text-orange-10" v-bind:class="{'text-strike': auto.vandut}">
            {{auto.pret_euro}}&nbsp;EUR
          </div>
        </q-card-section>

      <q-separator />

      </q-card>
    </q-list>
  <!-- </q-scroll-area> -->

  </q-page>
  
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="currentPage"
        color="deep-orange"
        :max="maxPage"
        :max-pages="6"
        @update:model-value="val => updatePage(val)"
        boundary-links
      />
    </div>


  
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'


export default {
  name: 'HomePage',
  preFetch({store, currentRoute}){
    const url= !currentRoute.query.page ? "https://auto-pitesti.ro/app/api/auto-vandute/" : `https://auto-pitesti.ro/app/api/auto-vandute/?page=${currentRoute.query.page}`;
    return store.dispatch('fetchCars', url)
  },
  setup(){
    const $store = useStore()
    const router = useRouter()
    return {
      autovehicule: ref($store.state.autovehicule),
      currentPage: ref($store.state.autovehicule.current_page_number),
      maxPage: ref($store.state.autovehicule.total_pages),
      cardDetails(slug){
        $store.dispatch('saveScrollPosition', {varName: router.currentRoute.value.fullPath, posY: window.scrollY});
        router.push({name:'CarDetailPageSold',params:{slug:slug}})
      },

      updatePage(page){
        router.push({name:'SoldCarsList',query: {page:page}})
      },

      async fetchData(url="/app/api/auto-vandute/") {
            if(this.$route.query.page){
              url += `?page=${this.$route.query.page}`
            }
            this.autovehicule = [];
            const res = await fetch(url);
            this.autovehicule = await res.json();
            this.maxPage = this.autovehicule.total_pages
            this.currentPage = this.autovehicule.current_page_number
      },
    }
  },  
  mounted(){
    const $store = useStore()
    const router = useRouter()
    setTimeout(() => {
        window.scroll({
        top: $store.state[router.currentRoute.value.fullPath] || 0,
        left: 0
      })
      $store.dispatch('saveScrollPosition', {varName: router.currentRoute.value.fullPath, posY: 0});
    })
  },
  watch: {
    $route(to, from) {
      this.fetchData();
    }
  }
}

</script>

