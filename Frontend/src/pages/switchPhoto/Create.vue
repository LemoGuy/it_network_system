<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar'
import Layout from '@/components/Layout.vue'
import backend from '../../services/backend'
import resIsOk from '../../utils/resIsOk'
import { useRouter } from 'vue-router'
import { token, setToken } from '../../services/token.js'

const router = useRouter()

const data = ref({})
const $q = useQuasar()



async function create() {

    const formData = new FormData();

    if (!data.value.name || !data.value.photoData) {
        $q.notify('Both fields must be filled!')
        return
    }

    formData.append('name', data.value.name || '')
    formData.append('photoData', data.value.photoData)


    let dataEntered
    try {
        dataEntered = await backend.post(`/photo`, formData, {
            headers: {
                Authorization: `Bearer ${token.value}`,
            }
        })
        router.push('/photos/search')

    } catch (e) {
        if (e.response.data.message) $q.notify(e.response.data.message)

    }


}


</script>

<template>
    <Layout>
        <q-card class="container">
            <p class="title">
                
            </p>
            <div class="input-container">

                <q-input outlined class="input-field" v-model="data.name" label="Photo Name"
                    :rules="[val => !!val || 'Field is required']" />

                <q-file outlined v-model="data.bookData" label="Upload Photo" class="input-field" clearable
                    :rules="[val => !!val || 'Field is required']" accept=".pdf" />

            </div>
            <q-btn class='create-btn' label='Upload' @click='create()' />
        </q-card>

        <div class="container pp whitten m">
          
        

      </div>
           

    </Layout>
</template>
<style scoped>
.address {
    width: 520px;
}
.whitten {
  box-shadow: inset 2000px 0 0 0 rgba(255, 255, 255, 0.3);
  background:  rgba(255, 255, 255, 0.5);
  border-color: rgba(255, 255, 255, 1);
  padding-top: 0px;
  font-size: 12pt;
}
.note {
    margin-top: 50px;
}

.title {
    font-size: 15pt;
}
.pp{
    width: 70% !important;
}
.ppp{
    margin-top: 0px;
}
.m{
    margin-top: 32px !important;
}
.container {
    display: flex;
    flex-direction: column;
    box-shadow: 10px 20px 50px 6px #1e1d1d ;
    margin-top: 20px;


    /* border: 1px solid grey; */
    /* border-radius: 10px; */
    padding: 25px;
    width: 30%;
    margin-inline: auto;
}

.input-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    width: 100%;
    gap: 20px
}

.gender-select {
    display: flex;
    align-items: center;
    height: 56px;
}

.birthdate-input {
    padding: 0;
}

.gender-select>p {
    margin: 0;
    font-size: 12pt;
}

.password-container {
    display: flex;
    align-items: stretch;
    gap: 20px
}

.password-container>* {
    flex: 1
}

.create-btn {
    margin-left: auto;
    margin-top: 50px;
    width: 100px;
}

.input-field {
    width: 315px;
}</style>