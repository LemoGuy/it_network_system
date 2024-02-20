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

    if (!data.value.name || !data.value.switchData) {
        $q.notify('All fields must be filled!')
        return
    }

    formData.append('name', data.value.name || '')
    formData.append('switchData', data.value.switchData)


    let dataEntered
    try {
        dataEntered = await backend.post(`/switch`, formData, {
            headers: {
                Authorization: `Bearer ${token.value}`,
            }
        })
        router.push('/switches/search')

    } catch (e) {
        if (e.response.data.message) $q.notify(e.response.data.message)

    }


}

</script>




<template>
    <Layout>
        <q-card class="container">
            <p class="title">
                Add Switch
            </p>


            <div class="input-container">

                <fieldset class="title">
                    <legend>Location Details</legend>

                  
                    <q-input outlined class="input-field" v-model="data.building" label="Building"
                        :rules="[val => !!val || 'Field is required']" />

                    <q-input outlined class="input-field" v-model="data.floor" label="Floor"
                        :rules="[val => !!val || 'Field is required']" />

                    <q-input outlined class="input-field" v-model="data.room" label="Room"
                        :rules="[val => !!val || 'Field is required']" />

                    <q-input outlined class="input-field" v-model="data.shelfNumber" label="Shelf Number"
                        :rules="[val => !!val || 'Field is required']" />

                </fieldset>

                <fieldset class="title">
                    <legend>Switch Details</legend>

                    <q-input outlined class="input-field" v-model="data.name" label="Name"
                        :rules="[val => !!val || 'Field is required']" />

                    <q-input outlined class="input-field" v-model="data.model" label="Model"
                        :rules="[val => !!val || 'Field is required']" />
                    <q-input outlined class="input-field" v-model="data.brand" label="Brand"
                        :rules="[val => !!val || 'Field is required']" />
                    <q-input outlined class="input-field" v-model="data.macAddress" label="MAC Address"
                        :rules="[val => !!val || 'Field is required']" />
                    <q-input outlined class="input-field" v-model="data.serialNumber" label="Serial Number"
                        :rules="[val => !!val || 'Field is required']" />
                    <q-input outlined class="input-field" v-model="data.ipAddress" label="IP Address"
                        :rules="[val => !!val || 'Field is required']" />
                    <q-input outlined class="input-field" v-model="data.vlan" label="VLAN"
                        :rules="[val => !!val || 'Field is required']" />
                    <q-input outlined class="input-field" v-model="data.firmwareVersion" label="Firmware Version"
                        :rules="[val => !!val || 'Field is required']" />
                    <q-input outlined class="input-field" v-model="data.portType" label="Port Type"
                        :rules="[val => !!val || 'Field is required']" />

                </fieldset>

                <fieldset class="title">
                    <legend>Port Details</legend>

                    <q-input outlined class="input-field" v-model="data.portNumber" label="Port Number"
                        :rules="[val => !!val || 'Field is required']" />
                    <q-input outlined class="input-field" v-model="data.patchPanelPortNumber" label="Patch Panel Port Number"
                        :rules="[val => !!val || 'Field is required']" />
                    <q-input outlined class="input-field" v-model="data.roomNumber" label="Goes to (Room Number)"
                        :rules="[val => !!val || 'Field is required']" />
                    <q-input outlined class="input-field" v-model="data.batchNumberOnWall" label="Batch Number On Wall"
                        :rules="[val => !!val || 'Field is required']" />

                </fieldset>

            </div>





            <q-btn class='create-btn' label='Upload' @click='create()' />
        </q-card>
    </Layout>
</template>







<style scoped>
.address {
    width: 520px;
}

.whitten {
    box-shadow: inset 2000px 0 0 0 rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.5);
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

.pp {
    width: 70% !important;
}

.ppp {
    margin-top: 0px;
}

.m {
    margin-top: 32px !important;
}

.container {
    display: flex;
    flex-direction: column;
    box-shadow: 10px 20px 50px 6px #1e1d1d;
    margin-top: 20px;


    /* border: 1px solid grey; */
    /* border-radius: 10px; */
    padding: 25px;
    width: 100%;
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
}
</style>