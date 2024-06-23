<script setup>
import jwt_decode from "jwt-decode";
import Fuse from "fuse.js";
import dateFormat from "dateformat";
import Layout from "../../components/Layout.vue";
import { onMounted, ref, watch } from "vue";
import backend from "../../services/backend";
import { token, setToken } from "../../services/token";
import resIsOk from "../../utils/resIsOk";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";

const q = useQuasar()
const route = useRoute();

const backendUrl = import.meta.env.VITE_BACKEND_URL;

let decodedToken = jwt_decode(token.value);

let switchdata = ref(null);

const columns = [
  {
    name: "portNumber",
    required: true,
    label: "Port Number",
    align: "left",
    field: "portNumber",
    sortable: true,
  },
  {
    name: "patchPanelPortNumber",
    required: true,
    label: "Patch Panel Port Number",
    align: "left",
    field: "patchPanelPortNumber",
    sortable: true,
  },

  {
    name: "roomNumber",
    required: true,
    label: "Room Number",
    align: "left",
    field: "roomNumber",
    sortable: true,
  },

  {
    name: "batchNumberOnWall",
    required: true,
    label: "Batch Number On Wall",
    align: "left",
    field: "batchNumberOnWall",
    sortable: true,
  },
];
async function updatePort(portId) {
   let res 
   
   try {
    res = await backend.put(
    `/switch/${route.query.id}/ports`,
    switchdata.value.ports,
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
  } catch (e){
    let msg = e?.response?.data?.message
    if (msg) q.notify({
      message: msg,
      color: 'negative'
    })
  }

 
}

onMounted(async () => {
  if (!route.query.id) return;
  let res = await backend.get(`/switch/${route.query.id}`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
  if (resIsOk(res)) {
    let data = res.data;
    switchdata.value = data;
  }
});
</script>

<template>
  <Layout>
    <div class="row fullwidth">
      <q-btn 
      class="q-my-md q-ml-auto" 
      clickable 
      v-close-popup 
      @click="updatePort()" 
      label="Save"
      color="primary"
      />
      <!-- icon="check" -->
      
    </div>

    <q-table
      v-if="switchdata"
      dense
      row-key="_id"
      class="table shad"
      :title="switchdata.name"
      :rows="switchdata.ports"
      :columns="columns"
      :rows-per-page-options="[0]"
    >
      <template v-slot:body-cell-portNumber="props">
        <q-td :props="props.portNumber">
          <q-input size="12px" dense v-model="props.row.portNumber"> </q-input>
        </q-td>
      </template>

      <template v-slot:body-cell-patchPanelPortNumber="props">
        <q-td :props="props.patchPanelPortNumber">
          <q-input size="12px" dense v-model="props.row.patchPanelPortNumber">
          </q-input>
        </q-td>
      </template>

      <template v-slot:body-cell-roomNumber="props">
        <q-td :props="props.roomNumber">
          <q-input size="12px" dense v-model="props.row.roomNumber"> </q-input>
        </q-td>
      </template>

      <template v-slot:body-cell-batchNumberOnWall="props">
        <q-td :props="props.batchNumberOnWall">
          <q-input size="12px" dense v-model="props.row.batchNumberOnWall">
          </q-input>
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
}

.filter-container > * {
  width: 250px;
}

.input-field-year {
  width: 125px;
}
</style>
