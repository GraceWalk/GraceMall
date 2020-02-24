<template>
  <div class="box" v-if="Object.keys(comment).length">
    <div class="head">
      <span>用户评价</span>
      <span>更多</span>
    </div>
    <div class="comment">
      <div class="user">
        <img :src="comment.user.avatar" alt="">
        <span class="name">{{ comment.user.uname }}</span>
      </div>
      <div class="desc">
        <div class="content">{{ comment.content }}</div>
        <div class="style">{{ comment.created | transTime }} {{ comment.style }}</div>
        <img v-for="(url, index) in comment.images" :key="index" :src="url" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from 'common/utils'

  export default {
    name: 'DetailCommentInfo',
    props: {
      comment: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    filters: {
      transTime(time) {
        const date = new Date(time * 1000)
        return formatDate(date, 'yyyy-MM-dd')
      }
    }
  }
</script>

<style scoped>
  .box {
    border-bottom: 5px solid #f2f5f8;
  }
  .head {
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin: 0px auto; 
    padding: 15px 0;
    border-bottom: 2px solid rgb(242, 245, 248);
    font-size: 14px;
    color: #000;
    letter-spacing: 1px;
  }
  .comment {
    width: 88%;
    margin: 0 auto;
    padding-top: 10px;
  }
  .user {
    display: flex;
  }
  .user img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
  .user span {
    padding-left: 15px;
    color: rgb(99, 99, 99);
    line-height: 35px;
  }
  .desc {
    margin: 10px 4px;
  }
  .desc .content {
    font-size: 14px;
  }
  .desc .style {
    margin: 8px 0;
    color: rgb(137, 137, 137);
    font-size: 12px;
  }
  .desc img {
    width: 70px;
    height: 70px;
    margin-right: 6px;
  }

</style>