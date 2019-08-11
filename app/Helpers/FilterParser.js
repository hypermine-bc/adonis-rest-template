'use strict'

class FilterParser {

    parse($query,filters){

        filters.forEach(values => {
            let $key = Object.keys(values)[0]
            let $value = values[$key]

            //If non equality operator
            if (Array.isArray($value)) {
                $value.forEach((operators) => {
                    let $operator = Object.keys(operators)[0]
                    let $valueToOperate = operators[$operator]

                    switch ($operator) {
                        case 'lte':
                            $query = $query.where($key, '<=', $valueToOperate);
                            break;
                        case 'lt':
                            $query = $query.where($key, '<', $valueToOperate);
                            break;
                        case 'gte':
                            $query = $query.where($key, '>=', $valueToOperate);
                            break;
                        case 'gt':
                            $query = $query.where($key, '>', $valueToOperate);
                            break;
                        case 'startsWith':
                            $query = $query.where($key, 'LIKE',$valueToOperate + '%')
                            break;
                        case 'endsWith':
                            $query = $query.where($key, 'LIKE', '%' + $valueToOperate)
                            break;
                        // case 'between':
                        //   if (is_array($valueToOperate))
                        //     $query = $query.whereBetween($key, $valueToOperate);
                        //   break;
                        // case 'in':
                        //   if (is_array($valueToOperate))
                        //     $query = $query.whereIn($key, $valueToOperate);
                        //   break;
                    }
                })
            } else {
                $query = $query.where(values);
            }

        })
        
        return $query
    }
}

module.exports = FilterParser
