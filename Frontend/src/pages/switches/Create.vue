<script setup>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import Layout from "@/components/Layout.vue";
import backend from "../../services/backend";
import resIsOk from "../../utils/resIsOk";
import { useRouter, useRoute } from "vue-router";
import userOptions from "../../constants/userOptions";
import { token, setToken } from "../../services/token.js";
import buildingOptions from "../../constants/buildingOptions";
import floorOptions from "../../constants/floorOptions";
import brandOptions from "../../constants/brandOptions";
import vlanOptions from "../../constants/vlanOptions";
import switchOptions from "../../constants/switchOptions";
// import switchValidater from '../../../../Backend/validator/switchValidater.js';

const props = defineProps(["userId"]);
const $q = useQuasar();
const router = useRouter();
const route = useRoute();
const data = ref({});

async function create() {
  let req = route.query.id ? backend.put : backend.post;
  let reqUrl = route.query.id ? `/switch/${route.query.id}` : `/switch`;
  let res;

  try {
    res = await req(reqUrl, data.value, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    router.push("/switches/search");
  } catch (e) {
    if (e.response.data.messages) {
      const msg = e.response.data.messages.join("<br>");
      $q.notify({
        message: msg,
        html: true,
      });
      console.log(msg)
    }
  }

  const formData = new FormData();

  if (
    !data.value.building ||
    !data.value.floor ||
    !data.value.room ||
    !data.value.shelfNumber ||
    !data.value.name ||
    !data.value.model ||
    !data.value.brand ||
    !data.value.macAddress ||
    !data.value.serialNumber ||
    !data.value.ipAddress ||
    !data.value.subnet ||
    !data.value.vlan ||
    !data.value.firmwareVersion ||
    !data.value.portType
  ) {
    $q.notify("All fields must be filled!");
    return;
  }
}

onMounted(async () => {
  if (!route.query.id) return;

  let res = await backend.get(`/switch/${route.query.id}`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
  data.value = res.data;
});
</script>

<template>
  <Layout>
    <q-card class="container">
      <p class="title">Switch details</p>
      <div class="input-container">
        <q-select
          outlined
          class="input-field"
          v-model="data.building"
          label="Building"
          :options="buildingOptions"
          emit-value
          :rules="[(val) => !!val || 'Field is required']"
        />

        <q-select
          outlined
          class="input-field"
          v-model="data.floor"
          label="Floor"
          :options="floorOptions"
          emit-value
          :rules="[(val) => !!val || 'Field is required']"
        />

        <q-input
          outlined
          class="input-field"
          v-model="data.room"
          label="Room"
          :rules="[(val) => !!val || 'Field is required']"
        />

        <q-input
          outlined
          class="input-field"
          v-model="data.shelfNumber"
          label="Shelf Number"
          :rules="[(val) => !!val || 'Field is required']"
        />

        <q-input
          outlined
          class="input-field"
          v-model="data.name"
          label="Name"
          :rules="[(val) => !!val || 'Field is required']"
        />

        <q-input
          outlined
          class="input-field"
          v-model="data.model"
          label="Model"
          :rules="[(val) => !!val || 'Field is required']"
        />

        <q-select
          outlined
          class="input-field"
          v-model="data.brand"
          label="Brand"
          :options="brandOptions"
          emit-value
          :rules="[(val) => !!val || 'Field is required']"
        />

        <q-input
          outlined
          class="input-field"
          v-model="data.macAddress"
          label="MAC Address"
          :rules="[(val) => !!val || 'Field is required']"
        />
        <q-input
          outlined
          class="input-field"
          v-model="data.serialNumber"
          label="Serial Number"
          :rules="[(val) => !!val || 'Field is required']"
        />
        <q-input
          outlined
          class="input-field"
          v-model="data.ipAddress"
          label="IP Address"
          :rules="[(val) => !!val || 'Field is required']"
        />

        <q-input
          outlined
          class="input-field"
          v-model="data.subnet"
          label="Subnet"
          :rules="[(val) => !!val || 'Field is required']"
        />

        <q-select
          outlined
          class="input-field"
          v-model="data.vlan"
          label="VLAN"
          :options="vlanOptions"
          emit-value
          :rules="[(val) => !!val || 'Field is required']"
        />

        <q-input
          outlined
          class="input-field"
          v-model="data.firmwareVersion"
          label="Firmware Version"
          :rules="[(val) => !!val || 'Field is required']"
        />

        <q-select
          outlined
          class="input-field"
          v-model="data.portType"
          label="Port Type"
          :options="switchOptions"
          emit-value
          :rules="[(val) => !!val || 'Field is required']"
        />
      </div>

      <q-btn
        class="create-btn"
        :label="route.query.id ? 'Update' : 'Create'"
        @click="create()"
      />
    </q-card>
  </Layout>
</template>

<style scoped>
.ip {
  width: 220px;
  display: inline-block;
}

.subnet {
  width: 77px;
  display: inline-block;
}

.title {
  font-size: 15pt;
}

.container {
  display: flex;
  flex-direction: column;
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
  gap: 20px;
}

.create-btn {
  margin-left: auto;
  margin-right: auto;
  width: 200px;
}

.input-field {
  width: 30%;
}
</style>
