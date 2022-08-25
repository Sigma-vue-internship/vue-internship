<template>
    <div class="overflow-auto">
        <b-pagination
            v-model="currentPage"
            :total-rows="totalPages"
            class="pagiantion"
            first-number
            @input="changePage"
        ></b-pagination>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    props: {
        totalPages: Number
    },
    data() {
        return {
            currentPage: 1
        }
    },
    methods: {
        changePage(currentPage) {
            this.$emit("changePage", currentPage);
        }
    }
}
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';
    .pagination > li > button {
        color: $darkGray;
    }
    .pagination > li > button:focus{
       @include paginationButton;
    }
    .pagination > li > button:hover {
       @include paginationButton;
        transition: background-color 0.5s ease;
    }
    .pagination > .page-link .active, .pagination > .active > .page-link {
        @include paginationButton;
        border-color: white;
    }
</style>