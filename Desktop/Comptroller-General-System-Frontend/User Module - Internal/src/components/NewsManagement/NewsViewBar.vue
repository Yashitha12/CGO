<template>
    <div>
        <div id="marquee-cont">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td width="142px" style="background:#1174A8;">
                        <button id="ticker-title">News :</button>
                    </td>
                    <td id="marquee">
                        <marquee onmouseover="this.stop();" onmouseout="this.start();" id='scroll'>
                            <div v-for="item in items" :key="item" style="display: inline-block;cursor: pointer;"
                                title="Click for view">
                                <div v-if="item.status == 1" v-on:click="getNews(item.id)">
                                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<i class="fa fa-newspaper-o" aria-hidden="true"></i>
                                    {{ item.heading }}</div>
                            </div>
                        </marquee>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<style>
#marquee-cont {
    margin-top: 5px;
    margin-bottom: 5px;
    padding-right: 30px;
    background: rgba(19, 0, 36);
}


#marquee-news {
    padding: 0px;
}

#ticker-title {
    border: none;
    padding: 5px 45px;
    background: rgba(19, 0, 36, 1);
    color: white;
}

#ticker-title:focus {
    outline: none;
}

#scroll {
    color: white;
}
</style>


<script>
import axios from 'axios';
//import axios from 'axios';
import resources_files from '../../services/base_resources'; //this file contains base resourses
export default {
    data() {
        return {
            items: [],
        }
    }, mounted() {
        //this method run when component load to the floating area
        this.changeMessage();
    },
    methods: {
        changeMessage() {
            return axios
                .get(resources_files.backend_url_internal() + '/get/api/production/user/internal/backend/restapi/get/all/news/by/pagable/1/1000')
                .then(response => {
                    this.items = response.data;
                }).catch(function (error) {
                    return error;
                });
        },
        getNews(dataParam) {
            return axios
                .get(resources_files.backend_url_internal() + '/get/api/production/user/internal/backend/restapi/get/one/news/' + dataParam)
                .then(response => {
                    this.$swal.fire({
                        position: "top-end",
                        title: "<h5><b>" + response.data.heading + "</b></h5><br/>" + "<h6 style='text-align: left'>" + response.data.content + "<h6>",
                        showConfirmButton: false,
                        timer: 30000
                    });
                }).catch(function (error) {
                    return error;
                });
        }
    },
};
</script>