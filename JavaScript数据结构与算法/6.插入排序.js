var group= [1,9,3,5,0,4];

function insertSort(list) {
    for (var i=1;i<list.length;i++){
        var j =i;
        var temp = list[i];
        while(j>0 && list[j-1]>temp){
            list[j]=list[j-1];
            j--;
        }
        list[j]=temp;
    }
return list;
}

insertSort(group);

console.log(group);