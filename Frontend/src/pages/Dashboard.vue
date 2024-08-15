
<script setup>
import Layout from '../components/Layout.vue'
</script>

<template>
<Layout>

    <q-card class="container">
          
    <div class="one">
  <h3>Instructions for IT Network System</h3>
</div>
            <div class="input-container">
                <div>
            <div>
              <p class="responsive-paragraph shad">
                <b>Objective:</b> This system is designed to collect essential information about switch rooms, switches, batch numbers, and other relevant details for maintaining and updating our network. Please follow the instructions below to ensure accurate and complete data entry.
                              </p>

                              <ol>
     
        <li><strong>Switch Information:</strong>
            <ol>
                    <ul>
                        <li>Switch Name/ID</li>
                        <li>Location (Room number, floor, building)</li>
                        <li>Model</li>
                        <li>IP Address</li>
                        <li>Port numbers</li>
                        <li>MAC Address</li>
                        <li>Firmware Version</li>
                        <li>Installation Date</li>
                        <li>Status (Active/Inactive)</li>
                    </ul>
            </ol>
        </li>

        <li><strong>Room Information:</strong>
            <ol type="a">
                <li>Provide details about the rooms where switches are located.</li>
                <li>Include:
                    <ul>
                        <li>Room Number</li>
                        <li>Floor</li>
                        <li>Building</li>
                        <li>Purpose of the Room</li>
                    </ul>
                </li>
            </ol>
        </li>

        <li><strong>Batch Numbers:</strong>
            <ul>
                <li>Provide batch numbers for switches or any related equipment.</li>
            </ul>
        </li>

        <li><strong>Additional Notes:</strong>
          <ul>
                <li>Use the space provided to add any relevant notes or observations about the switches, rooms, or batch numbers.</li>
            </ul>
        
        </li>

        <li><strong>Submission:</strong>
            <ol type="a">
                <li>Review the entered information for accuracy. If there was a mistake, update it.</li>
                <li>Click on the "Submit" button to save the data.</li>
            </ol>
        </li>

        <li><strong>Verification and Follow-Up:</strong>
            <ol type="a">
                <li>Once the form is submitted, IT administrator may review the information.</li>
                <li>If there are any discrepancies or additional information is required, you may be contacted for clarification.</li>
            </ol>
        </li>
    </ol>

    <p class="responsive-paragraph shad">Thank you for your cooperation in maintaining our IT network system efficiently. Your input is crucial for seamless operations and effective management.</p>
            </div>
        </div>
            </div>
        </q-card>
    
</Layout>

</template>
<style scoped>
h3 {
  position: relative;
  padding: 0;
  margin: 0;
  font-family: "Raleway", sans-serif;
  font-weight: 300;
  font-size: 40px;
  color: #080808;
  -webkit-transition: all 0.4s ease 0s;
  -o-transition: all 0.4s ease 0s;
  transition: all 0.4s ease 0s;
}

h3 span {
  display: block;
  font-size: 0.5em;
  line-height: 1.3;
}
h3 em {
  font-style: normal;
  font-weight: 600;
}

/* === HEADING STYLE #1 === */
.one h3 {
  text-align: center;
  text-transform: uppercase;
  padding-bottom: 5px;
}
.one h3:before {
  width: 48px;
  height: 5px;
  display: block;
  content: "";
  position: absolute;
  bottom: 3px;
  left: 50%;
  margin-left: -14px;
  background-color: #5f83c2;
}
.one h3:after {
  width: 300px;
  height: 1px;
  display: block;
  content: "";
  position: relative;
  margin-top: 25px;
  left: 35%;
  margin-left: -50px;
  background-color: #5f83c2;
}
.shad{

    margin-top: 20px;
}
P {
font-family: "trebuchet MS";
color: #222222; 
font-size: 12pt;
text-align: justify;  
line-height: 28px;  
padding: 10px;
margin-top: 10px;
}
.title {
    font-size: 15pt;
}
.container {
    display: flex;
    flex-direction: column;


    /* border: 1px solid grey; */
    /* border-radius: 10px; */
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
    gap: 20px
}

</style>