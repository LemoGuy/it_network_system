<script setup>
import jwt_decode from "jwt-decode";
import Fuse from "fuse.js";
import dateFormat from "dateformat";
import Layout from "../../components/Layout.vue";
import { onMounted, ref, watch } from "vue";
import backend from "../../services/backend";
import { token, setToken } from "../../services/token";
import resIsOk from "../../utils/resIsOk";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

let decodedToken = jwt_decode(token.value);

let switches = ref([]);
let filteredSwitches = ref([]);
let switchName = ref("");

let fuse = null;

const pageOptions = {
  rowsPerPage: 10,
};

const columns = [
  {
    name: "name",
    required: true,
    label: "Switch Name",
    align: "left",
    field: "name",
    sortable: true,
  },
  
  {
    name: "ip",
    required: true,
    label: "IP Address",
    align: "left",
    field: "ipAddress",
    sortable: true,
  },
  {
    name: "subnet",
    required: true,
    label: "Subnet",
    align: "left",
    field: "subnet",
    sortable: true,
  },
  {
    name: "vlan",
    required: true,
    label: "VLAN",
    align: "left",
    field: "vlan",
    sortable: true,
  },
  {
    name: "building",
    required: true,
    label: "Location",
    align: "left",
    field: "building",
    sortable: true,
  },
  {
    name: "floor",
    required: true,
    label: "Floor",
    align: "left",
    field: "floor",
    sortable: true,
  },
  {
    name: "roomNumber",
    required: true,
    label: "Room Number",
    align: "left",
    field: "room",
    sortable: true,
  },
  {
    name: "uploadedBy",
    required: true,
    label: "Uploaded By",
    align: "left",
    field: f => f.uploadedBy.name,
    sortable: true,
  },

  {
    name: "uploadDate",
    required: true,
    label: "Uploaded Date",
    align: "left",
    field: "uploadDate",
    format: (v) => dateFormat(v, "dd/mm/yyyy, H:M"),
    sortable: true,
  },
  {
    label: "Ports",
    name: "ports",
  },
  {
    label: "Edit",
    name: "edit",
  },
  {
    // label: "Remove",
    name: "delete",
  },
];

onMounted(async () => {
  let res = await backend.get("/switch", {
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  });
  if (resIsOk) {
    let data = res.data;

    switches.value = data;
    filteredSwitches.value = data;
    
    fuse = new Fuse(data, {
      keys: ["name", "uploadedBy.name"]
    });
  }
});

const handleSearch = (e) => {
  if (e === "") {
    filteredSwitches.value = switches.value;
    return;
  }
  let newfilteredSwitches = fuse.search(e);
  newfilteredSwitches = newfilteredSwitches.map((switches) => switches.item);
  filteredSwitches.value = newfilteredSwitches;
};

async function deleteSwitch(id) {
  let res = await backend.delete(`/switch/${id}`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
  if (res.status === 200) {
    switches.value = switches.value.filter((switches) => switches._id !== id);
    filteredSwitches.value = filteredSwitches.value.filter(
      (switches) => switches._id !== id
    );
    fuse = new Fuse(switches.value, {
      keys: ["name", "uploadedBy.name"],
    });
  }
}
</script>

<template>
  <Layout>
    <q-card class="filter-container">
      <q-input
        v-model="switchName"
        label="Search"
        outlined
        :debounce="500"
        @update:model-value="handleSearch"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </q-card>

    <q-table dense
      row-key="_id"
      class="table shad"
      title="Switches"
      :rows="filteredSwitches"
      :columns="columns"
      :pagination="pageOptions"
    >
      <template v-slot:body-cell-ports="props">
        <q-td :props="props">
          <q-btn size="12px" dense clickable v-close-popup :href="`/#/switches/view?id=${props.row._id}`">
            <q-icon center name="visibility" color="black" /></q-btn>
          <!-- <a :href="getFileUrl(props.row)">{{props.row.name}}</a> -->
        </q-td>
      </template>

      <template v-slot:body-cell-edit="props">
        <q-td :props="props">
          <q-btn  size="12px" dense clickable v-close-popup :href="`/#/switches/create?id=${props.row._id}`">
            <q-icon center name="edit" color="black" />
          </q-btn>
          <!-- <a :href="getFileUrl(props.row)">{{props.row.name}}</a> -->
        </q-td>
      </template>
      <template
        v-slot:body-cell-delete="props"
        v-if="decodedToken.role === 'Admin'"
      >
        <q-td :props="props">
          <q-btn size="12px" dense
            @click="deleteSwitch(props.row._id)"
            icon="delete_forever"
            color="red"
          />
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
}

.filter-container > * {
  width: 250px;
}

.input-field-year {
  width: 125px;
}
</style>
