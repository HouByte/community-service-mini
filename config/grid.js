import roleType from "../enum/role-type";
import serviceType from "../enum/service-type";
import myCardTag from "../enum/my-card-tag";
import cellType from "../enum/cell-type";


const myGrid = [
    {
        tag:myCardTag.appointWithMeStatus,
        rowNum: 4,
        title: '预约我的',
        extend: '查看全部',
        extendCell: {
            type:cellType.ORDER,
            role: roleType.PUBLISHER,
            status: -1,
        },
        gridItems: [
            {
                badge: 'unapproved',
                cell: {type:cellType.ORDER,role: roleType.PUBLISHER, status: 0},
                icon: 'operation',
                text: '待处理'
            },
            {
                badge: 'unpaid',
                cell: {type:cellType.ORDER,role: roleType.PUBLISHER, status: 1},
                icon: 'file-open',
                text: '待支付'
            },
            {
                badge: 'unconfirmed',
                cell: {type:cellType.ORDER,role: roleType.PUBLISHER, status: 2},
                icon: 'complete',
                text: '待确认'
            },
            {
                badge: 'unrated',
                cell: {type:cellType.ORDER,role: roleType.PUBLISHER, status: 3},
                icon: 'comment',
                text: '待评价'
            }
        ]
    },

    {
        tag:myCardTag.myAppointStatus,
        rowNum: 4,
        title: '我的预约',
        extend: '查看全部',
        extendCell: {
            type:cellType.ORDER,
            role: roleType.CONSUMER,
            status: -1,
        },
        gridItems: [
            {
                badge: 'unapproved',
                cell: {type:cellType.ORDER,role: roleType.CONSUMER, status: 0},
                icon: 'operation',
                text: '待同意'
            },
            {
                badge: 'unpaid',
                cell: {type:cellType.ORDER,role: roleType.CONSUMER, status: 1},
                icon: 'file-open',
                text: '待支付'
            },
            {
                badge: 'unconfirmed',
                cell: {type:cellType.ORDER,role: roleType.CONSUMER, status: 2},
                icon: 'complete',
                text: '待确认'
            },
            {
                badge: 'unrated',
                cell: {type:cellType.ORDER,role: roleType.CONSUMER, status: 3},
                icon: 'comment',
                text: '待评价'
            }
        ]
    },

    {
        tag:myCardTag.provideServiceStatus,
        rowNum: 4,
        title: '我在提供',
        extend: '',
        extendCell: null,
        gridItems: [
            {
                badge: 'unpublished',
                cell: {type:cellType.SERVICE,serviceType: serviceType.PROVIDE, status: 0},
                icon: 'upload',
                text: '待发布'
            },
            {
                badge: 'pending',
                cell: {type:cellType.SERVICE,serviceType: serviceType.PROVIDE, status: 1},
                icon: 'time',
                text: '待审核'
            },
            {
                badge: 'published',
                cell: {type:cellType.SERVICE,serviceType: serviceType.PROVIDE, status: 2},
                icon: 'file-common',
                text: '已发布'
            },
            {
                badge: 'all',
                cell: {type:cellType.SERVICE,serviceType: serviceType.PROVIDE, status: -1},
                icon: 'comment',
                text: '查看全部'
            },
        ]
    },

    {
        tag:myCardTag.seekServiceStatus,
        rowNum: 4,
        title: '正在找',
        extend: '',
        extendCell: null,
        gridItems: [
            {
                badge: 'unpublished',
                cell: {type:cellType.SERVICE,serviceType: serviceType.SEEK, status: 0},
                icon: 'upload',
                text: '待发布'
            },
            {
                badge: 'pending',
                cell: {type:cellType.SERVICE,serviceType: serviceType.SEEK, status: 1},
                icon: 'time',
                text: '待审核'
            },
            {
                badge: 'published',
                cell: {type:cellType.SERVICE,serviceType: serviceType.SEEK, status: 2},
                icon: 'file-common',
                text: '已发布'
            },
            {
                badge: 'all',
                key: 'unrated',
                slot: 'unrated',
                cell: {type:cellType.SERVICE,serviceType: serviceType.SEEK, status: -1},
                icon: 'comment',
                text: '查看全部'
            },
        ]
    }
]

export {myGrid}
