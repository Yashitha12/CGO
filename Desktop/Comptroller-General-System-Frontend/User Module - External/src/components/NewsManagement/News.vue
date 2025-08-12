<template>
    <div>
        <div id="marquee-cont">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tbody>
                    <tr>
                        <td width="142px" style="background:#1174A8;">
                            <button id="ticker-title">News :</button>
                        </td>
                        <td id="marquee">
                            <!-- Use div with CSS animation instead of marquee -->
                            <div class="scrolling-text" @mouseover="pauseAnimation" @mouseout="resumeAnimation">
                                <div v-for="item in items" :key="item" style="display: inline-block;cursor: pointer;"
                                    title="Click for view">
                                    <div v-if="item.status == 1" v-on:click="getNews(item.id)">
                                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<i class="fa fa-newspaper-o" aria-hidden="true"></i>
                                        {{ item.heading }}
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style>
#marquee-cont {
    margin-top: 5px;
    margin-bottom: 5px;
    padding-right: 30px;
    background: linear-gradient(90deg, rgba(19, 0, 36, 1) 28%, rgba(6, 133, 159, 1) 100%);
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

.scrolling-text {
    color: white;
    animation: scroll-left 30s linear infinite;
}

.scrolling-text.paused {
    animation-play-state: paused;
}

@keyframes scroll-left {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
}
</style>


<script>
import axios from 'axios';
import resources_files from '../../services/base_resources';

export default {
    data() {
        return {
            items: [],
        }
    }, 
    mounted() {
        this.changeMessage();
    },
    methods: {
        pauseAnimation() {
            document.querySelector('.scrolling-text').classList.add('paused');
        },
        resumeAnimation() {
            document.querySelector('.scrolling-text').classList.remove('paused');
        },
        changeMessage() {
            // Mock data for development when backend is not accessible
            if (import.meta.env.DEV) {
                this.items = [
                    {
                        id: 1,
                        status: 1,
                        heading: "Welcome to the Comptroller General System",
                        content: "This is a sample news item for development purposes."
                    },
                    {
                        id: 2,
                        status: 1,
                        heading: "System Maintenance Scheduled",
                        content: "Regular maintenance will be performed this weekend."
                    },
                    {
                        id: 3,
                        status: 1,
                        heading: "New Features Available",
                        content: "Check out the latest updates to the asset management system."
                    }
                ];
                return Promise.resolve();
            }

            // Production API call
            return axios
                .get(resources_files.backend_url_internal() + '/get/api/production/user/internal/backend/restapi/get/all/news/by/pagable/1/1000')
                .then(response => {
                    this.items = response.data;
                }).catch(function (error) {
                    console.error('Error fetching news:', error);
                    return error;
                });
        },
        getNews(dataParam) {
            return axios
                .get(resources_files.backend_url_internal() + `/get/api/production/user/internal/backend/restapi/get/one/news/${dataParam}`)
                .then(response => {
                    this.$swal.fire({
                        position: "top-end",
                        title: "<h5><b>" + response.data.heading + "</b></h5><br/>" + "<h6 style='text-align: left'>" + response.data.content + "<h6>",
                        showConfirmButton: false,
                        timer: 30000
                    });
                }).catch(function (error) {
                    console.error('Error fetching news item:', error);
                    return error;
                });
        }
    },
};
</script>