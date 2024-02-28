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

let switches = ref([]);
let filteredSwitches = ref([]);
let switchName = ref('');

let fuse = null;

const pageOptions = {
    rowsPerPage: 7
}

const columns = [
    // {
    //     name: 'id',
    //     required: true,
    //     label: 'ID',
    //     align: 'left',
    //     field: '_id',
    //     sortable: true
    // },
    {
        name: 'name',
        required: true,
        label: 'Switch Name',
        align: 'left',
        field: 'name',
        format: val => `${val}`,
        sortable: true
    },


    {
        name: 'uploadedBy',
        required: true,
        label: 'Uploaded By',
        align: 'left',
        field: 'uploadedBy.name',
        sortable: true
    },

    // {
    //     name: 'uploadDate',
    //     required: true,
    //     label: 'Uploaded Date',
    //     align: 'left',
    //     field: 'uploadDate',
    //     sortable: true
    // },
    {
        name: 'open',
    },
    {
        name: 'delete',
    }

]

onMounted(async () => {
    let res = await backend.get('/switch', {
        headers: {
            'Authorization': `Bearer ${token.value}`
        }
    })
    if (resIsOk(res)) {
        let data = res.data
        // for (let i = 0; i < data.length; i++) {
        //     console.log(data[i])
        //     let formatedDate = new Date(data[i].uploadDate)
        //     formatedDate = dateFormat(formatedDate, 'dddd, mmmm dS, yyyy, h:MM:ss TT')
        //     data[i].uploadDate = formatedDate
        // }
        switches.value = data
        filteredSwitches.value = data
        fuse = new Fuse(data, {
            keys: ['name', 'uploadedBy.name']
        });
    }
})

const handleSearch = (e) => {
    if (e === '') {
        filteredSwitches.value = switches.value
        return
    }
    let newfilteredSwitches = fuse.search(e)
    newfilteredSwitches = newfilteredSwitches.map(switches => switches.item);
    filteredSwitches.value = newfilteredSwitches;
}


async function deleteSwitch(id) {
    let res = await backend.delete(`/switch/${id}`, {
        headers: {
            'Authorization': `Bearer ${token.value}`
        }
    })
    if (res.status === 200) {
        switches.value = switches.value.filter(switches => switches._id !== id)
        filteredSwitches.value = filteredSwitches.value.filter(switches => switches._id !== id)
        fuse = new Fuse(switches.value, {
            keys: ['name', 'uploadedBy.name']
        });
    }

}

</script>

<template>
    <Layout>
        <q-card class="filter-container">
            <q-input v-model='switchName' label="Search" outlined :debounce="500" @update:model-value="handleSearch">
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input>
        </q-card>

        <q-table row-key="_id" class='table shad' title="Switches" :rows="filteredSwitches" :columns="columns"
            :pagination="pageOptions">
            <template v-slot:body-cell-open="props">
                <q-td :props="props">
                    <q-btn @click="openFile(getFileUrl(props.row))">
                        <q-icon left name="menu_switch" />
                        <div>See</div>
                    </q-btn>
                    <!-- <a :href="getFileUrl(props.row)">{{props.row.name}}</a> -->
                </q-td>
            </template>
            <template v-slot:body-cell-delete="props" v-if="decodedToken.role === 'Admin'">
                <q-td :props="props">
                    <q-btn @click="deleteSwitch(props.row._id)" icon="delete_forever" color="red" />
                    <!-- <a :href="getFileUrl(props.row)">{{props.row.name}}</a> -->
                </q-td>
            </template>
        </q-table>
    </Layout>
</template>

<style scoped>
.table :deep(th) {

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
