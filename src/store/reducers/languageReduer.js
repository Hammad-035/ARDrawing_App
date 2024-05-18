import {SELECT_LANGUAGE} from '../type'
const initialState={
    selectedLanguageName:"English",
    selectedLanguage:{
        Trace:'Trace',
        Sketch:'Sketch',
        Next:'Next',
        onboarding:'Onboarding',
        TraceandSketch:'Trace & Sketch',
        usecameratodrawsketch:`Use a camera to draw Sketch`,
        varioustemplateavailible:`lots of tracing templates:Animal , Car, ${"\n"} Nature , Food,Anime etc`,
        traceimagesfromgallery:`Convert to pencil photo for easy drawing`,
        traceimageonpaperwithcameratracing:'Trace image on paper with camera tracing',
        camera:'Camera',
        library:'Library',
        cute:'Cute',
        viewall:'View All',
        animal:'Animal',
        architecture:'Architecture',
        cartoon:'Cartoon',
        anim:'Anim',
        nature:'Nature',
        noel:'Noel',
        object:'Object',
        people:'People',
        fruits:'Fruits',
        continue:'Continue',
        step_1:'Step 1',
        step_2:'Step 2',
        step_3:'Step 3',
        step_4:'Step 4',
        After_selecting_your_favorite_image_the_trace_screen_will_show_the_drawing_on_your_phones_screen:`After selecting your favorite image, the trace screen will show the drawing on your phone's screen`,
        start_to_draw:'Start to Draw',
        Place_a_piece_of_paper_on_the_screen_and_proceed_to_draw_the_image:'Place a piece of paper on the screen & proceed to draw the image',
        The_image_from_the_phone_will_be_to_inverted_and_you_can_draw_it_from_there:'The image from the phone will be to inverted, and you can draw it from there',
        Put_your_phone_on_a_water_glass_so_that_it_is_parallel_to_the_table:`Put your phone on a water glass so that it is parallel {'\n'} to the table`,
        learn_to_draw_in_step_by_step:'Learn to draw in Step by Step',
        Trace_image_on_paper_with_camera_tracing:"Trace image on paper with camera tracing",
        Turn_on_maximum_screen_brightness_to_display_lines_more_easily:'Turn on maximum screen brightness to display lines more easily',
        Use_screen_lock_mode_when_drawing_to_avoid_movement:'Use screen lock mode when drawing to avoid movement',
        Drawing_paper_that_is_too_thick_will_not_be_able_to_print_lines:'Drawing paper that is too thick will not be able to print lines',
        Drawing:'Drawing',
        Lession:'Lesson',
        Favourites:'Favourites',
        Work:'Work',
        variou_template:'Various Templates',
        availibity:'Available',
        trace_image:'Trace images',
        from_gallery:'from gallery',
        Learn_Draw_Step_Step:`Learn to draw in ${'\n'}Step by Step`
    }
}

export const languageReducer = (state=initialState,action) => {
        switch (action.type) {
            case SELECT_LANGUAGE:
                return{
                    ...state,
                    selectedLanguageName:action.payload.selectedLanguageName,
                    selectedLanguage:action.payload.selectedLanguage
                }
            default:
                return state
        }
}