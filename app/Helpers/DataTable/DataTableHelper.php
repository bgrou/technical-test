<?php

namespace App\Helpers\DataTable;

use Illuminate\Http\Request;

class DataTableHelper
{
    public static function fetchData(Request $request,
                                     $model,
                                     $defaultSortField = 'id',
                                     $defaultSortOrder = 'desc',
                                     $with = [],
                                     $allowedSortFields = []
    )
    {
        $sortFieldInput = $request->input('sort_field', $defaultSortField);
        $sortField = in_array($sortFieldInput, $allowedSortFields) ? $sortFieldInput : $defaultSortField;
        $sortOrder = $request->input('sort_order', $defaultSortOrder);
        $searchInput = $request->input('search');
        $searchFilter = $request->input('search_filter');
        $perPage = $request->input('per_page', 20);

        $query = $model::query()->with($with);

        if (str_contains($sortField, '.')) {
            [$relation, $relationField] = explode('.', $sortField);

            $relatedTable = $model->{$relation}()->getRelated()->getTable();
            $foreignKey = $model->{$relation}()->getForeignKeyName();

            $query = $query->join($relatedTable, "$relatedTable.id", '=', $foreignKey)
                ->orderBy("$relatedTable.$relationField", $sortOrder)
                ->select("$model->table.*");
        } else {
            $query = $query->orderBy($sortField, $sortOrder);
        }

        if (!is_null($searchInput) && !is_null($searchFilter)) {
            $searchQuery = "%$searchInput%";
            $query = $query->where($searchFilter, 'like', $searchQuery);
        }

        return $query->paginate((int)$perPage);
    }
}
