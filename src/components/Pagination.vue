<template>
    <div class="overflow-auto">
        <b-pagination
            v-model="currentPage"
            :total-rows="totalPages"
            :per-page="limit"
            aria-controls="my-table"
            @page-click="setPage(currentPage)"
            class="pagiantion"
        ></b-pagination>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    props: {
        limit: Number,
        totalPages: Number
    },
    data() {
        return {
            currentPage: 1
        }
    },
    methods: {
        setPage(currentPage) {
            this.$emit('changePage', currentPage);
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