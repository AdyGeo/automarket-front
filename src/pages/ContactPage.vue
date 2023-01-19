<template>
  <q-page class="row" padding>

    <div v-if="companie" class="q-px-sm-xl q-px-md col-md-4 col-12">
      <h4>Informatii contact</h4>
      <p class="text-h6">{{companie.denumire}}</p>
      <p class="text-subtitle1">{{companie.adresa}}</p>
      <p class="text-h6">Email</p>
      <p class="text-subtitle1"><a style="text-decoration:none" :href="('mailto:'+companie.email)">{{companie.email}}</a></p>
      <p class="text-h6">Telefon</p>
      <p class="text-subtitle1"><a style="text-decoration:none" :href="('tel:'+companie.telefon)">{{companie.telefon}}</a></p>

    </div>
    <div data-nosnippet class="q-px-sm-xl q-pt-xl q-px-md col-md-6 col-12">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2827.460513953152!2d24.843792715409226!3d44.87327647909841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b2bb7f7898327f%3A0xd3ac93f17a9c0f05!2sGrand%20Class%20Auto%20SRL!5e0!3m2!1sro!2sro!4v1670426368744!5m2!1sro!2sro" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    <div class="q-px-sm-xl q-pb-xl q-px-md col-md-10 col-12">
      <h4>Trimite-ne un email</h4>
          <q-form
            ref="contactByEmailForm"
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
          >
            <q-input
              filled
              v-model="contactname"
              label="Numele tau *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || '']"
            />

            <q-input
              filled
              v-model="email"
              type="email"
              label="Adresa ta de email *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || '']"
            />

            <q-input
              filled
              type="textarea"
              v-model="emailBody"
              label="Mesaj *"
              lazy-rules
              :rules="[val => val !== null && val !== '' || '',]"
            />
            <div>
              <q-btn label="Trimite" type="submit" color="indigo"/>
              <q-btn label="Anuleaza" type="reset" color="indigo" flat class="q-ml-sm" />
            </div>
          </q-form>
    </div>
    

  </q-page>
  
</template>

<script>

  import { useQuasar  } from 'quasar';
  import { ref } from 'vue';
  import { useStore } from 'vuex'

  export default {
    name: 'ContactPage',
    setup () {
      const $store = useStore()
      const getCookie = (name) => {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
      }
      const contactByEmailForm = ref(null)
      const $q = useQuasar()
      const contactname = ref(null)
      const email = ref(null)
      const emailBody = ref(null)
      const companie = $store.state.companie

      const onReset = ()=>{
          contactname.value = null
          email.value = null
          emailBody.value = null
      }
      const onSubmit = async () => {
          
          const url = "/app/api/contact-email/";
                const method =  "POST";
                try {
                    const res = await fetch(url, {
                        method: method,
                        headers: {
                            "Content-Type": "application/json",
                            "X-CSRFToken": getCookie('csrftoken')
                        },
                        body: JSON.stringify({
                            contactname: contactname.value,
                            email: email.value,
                            emailBody: emailBody.value
                        })
                    });
                    if (!res.ok) {
                      let message = res.status == '429' ? 'Poti trimite maximum 3 email-uri pe zi.' :  'Ups! Ceva nu a functionat cum trebuie. Te rugam reincearca.';
                      $q.notify({
                        color: 'negative',
                        textColor: 'white',
                        icon: 'warning',
                        message: message
                      })

                      throw new Error(res.status + " " + res.statusText);

                    } else {
                      $q.notify({
                        color: 'positive',
                        textColor: 'white',
                        icon: 'email',
                        message: 'Mesajul tau a fost trimis. Multumim.'
                      })
                      contactByEmailForm.value.reset()
                    }

                  } catch (err) {
                    console.log(err);
                }

        }
      return {
        contactname,
        email,
        emailBody,
        companie,
        onReset,
        onSubmit,
        contactByEmailForm,
        getCookie
      }
    },
  }

</script>
