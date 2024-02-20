<script setup>
import jwt_decode from 'jwt-decode'
import Fuse from 'fuse.js'
import dateFormat from "dateformat";
import Layout from '../../components/Layout.vue';
import { onMounted, ref, watch } from 'vue';
import backend from '../../services/backend';
import { token, setToken } from '../../services/token';
import resIsOk from '../../utils/resIsOk';

const backendUrl = import.meta.env.VITE_BACKEND_URL
let decodedToken = jwt_decode(token.value)

let photos = ref([]);
let filteredPhotos = ref([]);
let photoName = ref('');

let fuse = null;

const pageOptions = {
    rowsPerPage: 7
}

const columns = [
    {
        name: 'name',
        required: true,
        label: 'Photo Name',
        align: 'left',
        field: 'name',
        format: val => `${val}`,
        sortable: true
    },

    {
        name: 'uploadDate',
        required: true,
        label: 'Uploaded Date',
        align: 'left',
        field: 'uploadDate',
        sortable: true
    },
    {
        name: 'open',
    },
    {
        name: 'delete',
    }

]



onMounted(async () => {

    let res = await backend.get('/photo?own=1', {
        headers: {
            'Authorization': `Bearer ${token.value}`
        }
    })


    if (resIsOk) {
        let data = res.data
        for (let i = 0; i < data.length; i++) {
            let formatedDate = new Date(data[i].uploadDate)
            formatedDate = dateFormat(formatedDate, 'dddd, mmmm dS, yyyy, h:MM:ss TT')
            data[i].uploadDate = formatedDate
        }
        photos.value = data
        filteredPhotos.value = data
        fuse = new Fuse(data, {
            keys: ['name', 'uploadedBy.name']
        });
    }
})

const handleSearch = (e) => {
    if (e === '') {
        filteredPhotos.value = photos.value
        return
    }
    let newFilteredPhotos = fuse.search(e)
    newFilteredPhotos = newFilteredPhotos.map(photo => photo.item);
    filteredPhotos.value = newFilteredPhotos;
}

const getFileUrl = (row) => {
    return `${backendUrl}file/${row.randomToken}-${row.photoHash}.${row.photoFileType}`
}


async function deletePhoto(id) {
    let res = await backend.delete(`/photo/${id}`, {
        headers: {
            'Authorization': `Bearer ${token.value}`
        }
    })
    if (res.status === 200) {
        photos.value = photos.value.filter(photo => photo._id !== id)
        filteredPhotos.value = filteredPhotos.value.filter(photo => photo._id !== id)
        fuse = new Fuse(photos.value, {
            keys: ['name', 'uploadedBy.name']
        });
    }

}


</script>

<template>
    <Layout>
        <q-card class="filter-container">
            <q-input v-model='photoName' label="Search" outlined :debounce="500" @update:model-value="handleSearch">
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input>
        </q-card>

        <q-table row-key="_id" class='table shad' title="My Photos" :rows="filteredPhotos" :columns="columns"
            :pagination="pageOptions">
            <template v-slot:body-cell-open="props">
                <q-td :props="props">
                    <q-btn :href="getFileUrl(props.row)">
                        <q-icon left name="menu_photo" />
                        <div>View</div>
                    </q-btn>
                    <!-- <a :href="getFileUrl(props.row)">{{props.row.name}}</a> -->
                </q-td>
            </template>
            <template v-slot:body-cell-delete="props">
                <q-td :props="props">
                    <q-btn @click="deletePhoto(props.row._id)" icon="delete_forever" color="red" />
                    <!-- <a :href="getFileUrl(props.row)">{{props.row.name}}</a> -->
                </q-td>
            </template>
        </q-table>
    </Layout>
</template>

<style scoped>
.table>>>th {
    font-weight: bold !important;
}

.filter-container {
    display: flex;
    gap: 15px;
    margin-bottom: 25px;
    padding: 25px;
    flex-wrap: wrap;
    box-shadow: 10px 20px 50px 6px #1e1d1d ;
}

.filter-container>* {
    width: 250px;
}

.input-field-year {
    width: 125px;

}
.shad{
    box-shadow: 10px 20px 50px 6px #1e1d1d ;


}
</style>
