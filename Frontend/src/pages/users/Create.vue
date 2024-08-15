<script setup>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import Layout from "@/components/Layout.vue";
import backend from "../../services/backend";
import resIsOk from "../../utils/resIsOk";
import { useRouter, useRoute } from "vue-router";
import userOptions from "../../constants/userOptions";
import statusOptions from "../../constants/statusOptions";
import { token, setToken } from "../../services/token.js";

const props = defineProps(["userId"]);
const $q = useQuasar();
const router = useRouter();
const route = useRoute();
const data = ref({});

async function create() {
  let req = route.query.id ? backend.put : backend.post;
  let reqUrl = route.query.id ? `/user/${route.query.id}` : `/user`;
  let res;
  try {
    res = await req(reqUrl, data.value, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    $q.notify("Success!");
    router.push("/users/search");
  } catch (e) {
    if (e.response.data.message) $q.notify(e.response.data.message);
  }
}

onMounted(async () => {
  if (!route.query.id) return;

  let res = await backend.get(`/user/${route.query.id}`, {
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
      <p class="title">Account details</p>
      <div class="input-container">
        <q-input
          outlined
          class="input-field"
          v-model="data.name"
          label="Full Name"
          :rules="[(val) => !!val || 'Field is required']"
        />

        <q-input
          outlined
          class="input-field"
          v-model="data.username"
          label="Username"
          :rules="[(val) => !!val || 'Field is required']"
        />
        <q-input
          outlined
          class="input-field"
          v-model="data.email"
          label="Email"
          :rules="[(val) => !!val || 'Field is required']"
        />

        

        

        <q-input
          outlined
          class="input-field"
          v-model="data.password"
          label="Password"
          type="password"
          :rules="[(val) => !!val || 'Field is required']"
        />
        <q-input
          outlined
          class="input-field"
          v-model="data.password2"
          label="Re-write password"
          type="password"
          :rules="[(val) => !!val || 'Field is required']"
        />

        <q-select
          outlined
          class="input-field"
          v-model="data.type"
          label="User Role"
          :options="userOptions"
          emit-value
          :rules="[(val) => !!val || 'Field is required']"
        />

        <q-select
          outlined
          class="input-field"
          v-model="data.status"
          label="Status"
          :options="statusOptions"
          emit-value
          :rules="[(val) => !!val || 'Field is required']"
        />

        <!-- <q-file outlined v-model="data.photo" label="Upload Photo" class="input-field" clearable /> -->
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


.title {
  font-size: 15pt;
}

.container {
  display: flex;
  flex-direction: column;
  padding: 25px;
  width: 100%;
  min-width: 300px;
  margin-inline: auto;
}

.input-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
}

.create-btn {
  margin-left: auto;
  margin-top: 50px;
  width: 100px;
}

.input-field {
  width: 30%;
  margin-right: auto;
}
</style>
