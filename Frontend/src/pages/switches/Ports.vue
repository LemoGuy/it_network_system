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
