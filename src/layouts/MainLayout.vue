<template>
  <q-layout view="hHh lpr fFf">

    <q-header class="bg-dark text-amber-5">
      <q-toolbar>
        <q-btn dense flat round size="lg" icon="menu" @click="toggleLeftDrawer" class="q-mr-auto"/>
        <q-img class="cursor-pointer" clickable @click="goHome" fit="contain" height="100px" src="~assets/logo.jpg"/>
      </q-toolbar>
    </q-header>

    <q-drawer 
        show-if-above 
        behavior="mobile"
        v-model="leftDrawerOpen" 
        side="left" 
        bordered  
        no-swipe-open
        class="bg-grey-3">

               <!-- drawer content -->
        <q-list>
          <q-item clickable v-ripple :to="{name:'HomePage'}" exact>
              <q-item-section avatar>
                <q-icon name="o_directions_car" size="md" />
              </q-item-section>
              <q-item-section>
                Automobile
              </q-item-section>
          </q-item>
          <q-item clickable v-ripple :to="{name:'SoldCarsList'}" exact>
              <q-item-section avatar>
                <q-icon name="o_mood" size="md" />
              </q-item-section>
              <q-item-section>
                Clienti multumiti
              </q-item-section>
          </q-item>
         <q-item clickable v-ripple :to="{name:'ContactPage'}" exact>
              <q-item-section avatar>
                <q-icon name="o_phone" size="md" />
              </q-item-section>
              <q-item-section>
                Contact
              </q-item-section>
          </q-item>
          <q-item clickable v-ripple :to="{name:'AboutPage'}" exact>
              <q-item-section avatar>
                <q-icon name="o_contact_page" size="md" />
              </q-item-section>
              <q-item-section>
                Despre noi
              </q-item-section>
          </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

    <footer v-if="companie" class="bg-grey-5 text-dark q-px-xl q-py-sm text-center" >
        <p>Copyright ©{{(new Date()).getFullYear()}} {{companie.denumire}}, CUI: {{companie.CUI}}, Reg. Com. {{companie.nr_registru_comert}}</p>
    </footer>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  preFetch({store}){
     return store.dispatch('fetchCompany')
  },
  setup () {
    const $store = useStore()

    const router = useRouter()
    const companie = $store.state.companie
    const leftDrawerOpen = ref(false)
    return {
      leftDrawerOpen,
      companie,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      goHome () {
        router.push({name:'HomePage'})
      }
    }
  }
}
</script>